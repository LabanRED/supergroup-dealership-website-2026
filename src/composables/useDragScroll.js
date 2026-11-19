export function createDragScrollHandler({ snapToSlide = true } = {}) {
  return function handleMouseDown(event) {
    if (event.button !== 0) return
    const el = event.currentTarget
    if (!el) return

    const startX = event.clientX
    const startScrollLeft = el.scrollLeft
    let moved = false

    el.style.scrollSnapType = 'none'
    el.style.scrollBehavior = 'auto'

    function onMouseMove(moveEvent) {
      const dx = moveEvent.clientX - startX
      if (Math.abs(dx) > 4) {
        moved = true
      }
      el.scrollLeft = startScrollLeft - dx
    }

    function preventClick(clickEvent) {
      clickEvent.preventDefault()
      clickEvent.stopPropagation()
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      el.style.scrollSnapType = ''
      el.style.scrollBehavior = ''

      if (moved) {
        el.addEventListener('click', preventClick, { capture: true, once: true })
        setTimeout(() => {
          el.removeEventListener('click', preventClick, { capture: true })
        }, 50)

        if (snapToSlide && el.clientWidth) {
          const targetIdx = Math.round(el.scrollLeft / el.clientWidth)
          el.scrollTo({
            left: targetIdx * el.clientWidth,
            behavior: 'smooth',
          })
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
}
