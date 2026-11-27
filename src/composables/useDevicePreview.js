import { ref, computed } from 'vue'

const VALID_DEVICES = new Set(['auto', 'desktop', 'tablet', 'mobile'])
const STORAGE_KEY = 'supergroup-device-preview'

function loadInitialDevice() {
  if (typeof window === 'undefined') return 'desktop'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && VALID_DEVICES.has(saved)) return saved
  } catch {
    // ignore storage errors
  }
  return 'desktop'
}

const activeDevice = ref(loadInitialDevice())

export function useDevicePreview() {
  const isLocal = computed(() => false)

  function setDevice(mode) {
    if (!VALID_DEVICES.has(mode)) return
    activeDevice.value = mode
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, mode)
      } catch {
        // ignore storage errors
      }
    }
  }

  return {
    activeDevice,
    setDevice,
    isLocal,
  }
}
