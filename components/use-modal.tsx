"use client"

import { useCallback, useEffect, useState, useSyncExternalStore, type RefObject } from "react"

/* Everything focusable the trap needs to cycle between */
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Never-changing store: subscribers get no updates; the snapshot is simply
// "am I on the client" (true) vs. the server render (false)
const emptySubscribe = () => () => {}

/*
 * True once mounted in the browser. Portalled overlays need this because
 * document.body does not exist during the server render.
 */
export const useIsMounted = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

export interface ModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

/*
 * Open/close plus the two things that must happen while open: Escape closes,
 * and the page behind stops scrolling.
 *
 * Split out from the lightbox so the open/close contract lives apart from the
 * thing being opened.
 */
export const useModalState = (): ModalState => {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return { isOpen, open, close }
}

/*
 * Keeps Tab inside the dialog and hands focus back where it came from on close.
 *
 * aria-modal only tells assistive tech the rest of the page is inert; it does
 * nothing to the tab order. Without this, Tab walks straight out of the dialog
 * and into the page the backdrop is covering, leaving a keyboard user driving
 * a page they cannot see.
 *
 * `isActive` gates the whole effect so it runs only once the element is really
 * in the document — pass the mounted flag for a portalled overlay.
 */
export const useFocusTrap = (ref: RefObject<HTMLElement | null>, isActive: boolean): void => {
  useEffect(() => {
    if (!isActive) return
    const container = ref.current
    if (container === null) return

    // Captured before we move focus, so it can be handed back on close —
    // otherwise dismissing the dialog drops the user at the top of the page
    const previouslyFocused = document.activeElement
    const focusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

    const [firstOnOpen] = focusable()
    firstOnOpen?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return

      const items = focusable()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) {
        // Nothing to focus: keep Tab from escaping to the page behind
        event.preventDefault()
        return
      }

      const active = document.activeElement
      const escapingBackwards = event.shiftKey && (active === first || !container.contains(active))
      const escapingForwards = !event.shiftKey && (active === last || !container.contains(active))

      if (escapingBackwards) {
        event.preventDefault()
        last.focus()
        return
      }
      if (escapingForwards) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [ref, isActive])
}
