import { ref, computed } from 'vue'

const activeDevice = ref('mobile')

export function useDevicePreview() {
  const isLocal = computed(() => false)

  function setDevice() {
    activeDevice.value = 'mobile'
  }

  return {
    activeDevice,
    setDevice,
    isLocal,
  }
}
