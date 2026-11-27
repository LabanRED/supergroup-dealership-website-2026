import { nextTick, onMounted, onUnmounted, watch } from 'vue'

const REVEAL_SELECTOR = [
  'h2',
  'article',
  'section .rounded-3xl',
  'section .rounded-\\[24px\\]',
  'section .rounded-2xl.border',
  'section button.rounded-2xl',
].join(', ')

function shouldSkipElement(el) {
  if (!el || el.dataset.revealReady === 'true') return true
  if (el.closest('[data-no-reveal], [role="dialog"], .fixed')) return true
  // Skip nested matches inside an already-tracked card/article
  if (el.parentElement?.closest('[data-reveal-ready="true"]')) return true
  // Skip tiny UI pills or pure media wrappers inside articles
  if (el.tagName !== 'H2' && el.offsetHeight < 48) return true
  return false
}

export function useScrollReveal(mainRef, scrollContainerRef, watchSources = []) {
  let intersectionObserver = null
  let mutationObserver = null

  function getObserverRoot() {
    const container = scrollContainerRef?.value
    if (!container || typeof window === 'undefined') return null
    const overflowY = window.getComputedStyle(container).overflowY
    const isScrollableContainer =
      (overflowY === 'auto' || overflowY === 'scroll') &&
      container.scrollHeight > container.clientHeight
    return isScrollableContainer ? container : null
  }

  function revealImmediately(el) {
    el.classList.add('is-revealed')
    el.style.transitionDelay = ''
  }

  function scanAndObserve() {
    const mainEl = mainRef?.value
    if (!mainEl) return

    const candidates = Array.from(mainEl.querySelectorAll(REVEAL_SELECTOR))
    const sectionCandidates = Array.from(
      mainEl.querySelectorAll(':scope > div > section, :scope > section'),
    )
    const newlyAdded = []

    for (const sec of sectionCandidates) {
      if (
        sec.dataset.sectionReveal === 'true' ||
        sec.classList.contains('hero-fade-in') ||
        sec.closest('[data-no-reveal]') ||
        sec.offsetHeight < 80
      ) {
        continue
      }
      sec.dataset.sectionReveal = 'true'
      sec.classList.add('scroll-reveal-section')
      newlyAdded.push(sec)
    }

    for (const el of candidates) {
      if (shouldSkipElement(el)) continue
      el.dataset.revealReady = 'true'
      el.classList.add('scroll-reveal')
      newlyAdded.push(el)
    }

    if (!newlyAdded.length) return

    if (!intersectionObserver) {
      newlyAdded.forEach(revealImmediately)
      return
    }

    // Force style/layout flush so elements initially in view transition smoothly on load
    void mainEl.offsetHeight

    requestAnimationFrame(() => {
      newlyAdded.forEach((el, index) => {
        // Subtle stagger for cards rendered together, capped so lower items never feel sluggish
        const delayMs = el.tagName === 'H2' ? 0 : Math.min((index % 4) * 60, 180)
        if (delayMs > 0) {
          el.style.transitionDelay = `${delayMs}ms`
        }
        intersectionObserver?.observe(el)
      })
    })
  }

  function setupObservers() {
    cleanupObservers()

    const mainEl = mainRef?.value
    if (!mainEl || typeof window === 'undefined') return

    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target
            el.classList.add('is-revealed')
            el.addEventListener(
              'transitionend',
              () => {
                el.style.transitionDelay = ''
              },
              { once: true },
            )
            intersectionObserver?.unobserve(el)
          }
        },
        {
          root: getObserverRoot(),
          threshold: 0.06,
          rootMargin: '0px 0px -24px 0px',
        },
      )
    }

    scanAndObserve()

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        scanAndObserve()
      })
      mutationObserver.observe(mainEl, { childList: true, subtree: true })
    }
  }

  function cleanupObservers() {
    intersectionObserver?.disconnect()
    intersectionObserver = null
    mutationObserver?.disconnect()
    mutationObserver = null
  }

  onMounted(async () => {
    await nextTick()
    setupObservers()
  })

  if (watchSources.length) {
    watch(watchSources, async () => {
      await nextTick()
      setupObservers()
    })
  }

  onUnmounted(() => {
    cleanupObservers()
  })
}
