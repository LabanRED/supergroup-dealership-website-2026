import { ref, computed } from 'vue'

const activeDevice = ref('auto')

const VALID_DEVICES = new Set(['auto', 'desktop', 'tablet', 'mobile'])

export function useDevicePreview() {
  const isLocal = computed(() => {
    if (import.meta.env.DEV) return true
    if (typeof window === 'undefined') return false
    const host = window.location.hostname
    return host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')
  })

  function setDevice(mode) {
    if (VALID_DEVICES.has(mode)) {
      activeDevice.value = mode
    }
  }

  return {
    activeDevice,
    setDevice,
    isLocal,
  }
}
