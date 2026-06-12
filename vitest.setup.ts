import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Testing Library's automatic cleanup needs a global afterEach, which this
// config doesn't enable (no `globals: true`) — unmount rendered trees manually.
afterEach(() => {
  cleanup()
})

// jsdom does not implement ResizeObserver, which Radix UI primitives
// (e.g. Checkbox) use for measurement. A no-op stand-in is enough for tests.
class ResizeObserverStub implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverStub
