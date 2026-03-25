import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

describe('useIsMobile', () => {
  const addEventListenerMock = vi.fn()
  const removeEventListenerMock = vi.fn()

  beforeEach(() => {
    addEventListenerMock.mockClear()
    removeEventListenerMock.mockClear()

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
      }),
    })
  })

  it('returns false on desktop-width viewport', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true on mobile-width viewport', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns true at exactly 767px (below breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 767 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false at exactly 768px (at breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 768 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('adds and removes media query listener', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 })
    const { unmount } = renderHook(() => useIsMobile())
    expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
    unmount()
    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
