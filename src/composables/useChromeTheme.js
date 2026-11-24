import { ref, onMounted, onUnmounted } from 'vue'

// Primary colour first: Blue (#00032B), then Grey (#3C3C3C), then Black (#000000)
export const CHROME_COLORS = ['#00032B', '#3C3C3C', '#000000']

const KEY_COLOR_MAP = {
  1: '#00032B',
  2: '#3C3C3C',
  3: '#000000',
  Digit1: '#00032B',
  Digit2: '#3C3C3C',
  Digit3: '#000000',
  Numpad1: '#00032B',
  Numpad2: '#3C3C3C',
  Numpad3: '#000000',
}

const chromeBg = ref(CHROME_COLORS[0])
let keyListenerCount = 0

function handleColorKeydown(event) {
  const tag = event.target?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target?.isContentEditable) {
    return
  }
  const color = KEY_COLOR_MAP[event.key] || KEY_COLOR_MAP[event.code]
  if (color) {
    chromeBg.value = color
  }
}

export function cycleChromeColor(direction = 1) {
  const currentIdx = CHROME_COLORS.indexOf(chromeBg.value)
  const idx = currentIdx === -1 ? 0 : currentIdx
  const nextIdx =
    direction > 0
      ? (idx + 1) % CHROME_COLORS.length
      : (idx - 1 + CHROME_COLORS.length) % CHROME_COLORS.length
  chromeBg.value = CHROME_COLORS[nextIdx]
}

export function createColorSwipeHandlers() {
  let startX = 0
  let startY = 0
  let trackingMouse = false

  function evaluateSwipe(endX, endY) {
    const dx = endX - startX
    const dy = endY - startY
    if (Math.abs(dx) <= 40 || Math.abs(dx) <= Math.abs(dy)) return
    cycleChromeColor(dx < 0 ? 1 : -1)
  }

  function onTouchStart(event) {
    const touch = event.touches?.[0]
    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY
  }

  function onTouchEnd(event) {
    const touch = event.changedTouches?.[0]
    if (!touch) return
    evaluateSwipe(touch.clientX, touch.clientY)
  }

  function onMouseDown(event) {
    if (event.button !== 0) return
    trackingMouse = true
    startX = event.clientX
    startY = event.clientY
  }

  function onMouseUp(event) {
    if (!trackingMouse) return
    trackingMouse = false
    evaluateSwipe(event.clientX, event.clientY)
  }

  return {
    onTouchStart,
    onTouchEnd,
    onMouseDown,
    onMouseUp,
  }
}

export function useChromeTheme() {
  onMounted(() => {
    if (keyListenerCount === 0 && typeof window !== 'undefined') {
      window.addEventListener('keydown', handleColorKeydown)
    }
    keyListenerCount += 1
  })

  onUnmounted(() => {
    keyListenerCount = Math.max(0, keyListenerCount - 1)
    if (keyListenerCount === 0 && typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleColorKeydown)
    }
  })

  return {
    chromeBg,
    chromeColors: CHROME_COLORS,
    ...createColorSwipeHandlers(),
  }
}
