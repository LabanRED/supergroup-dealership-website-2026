<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  src: {
    type: String,
    required: true,
  },
})

const CROSSFADE_SECONDS = 1.2

const videoA = ref(null)
const videoB = ref(null)
const activeSlot = ref(0)
let isCrossfading = false
let resetTimer = null

function getVideos() {
  return [videoA.value, videoB.value]
}

function handleTimeUpdate(slotIndex) {
  if (slotIndex !== activeSlot.value || isCrossfading) return
  const videos = getVideos()
  const current = videos[slotIndex]
  const nextSlot = slotIndex === 0 ? 1 : 0
  const next = videos[nextSlot]
  if (!current || !next || !current.duration || Number.isNaN(current.duration)) return

  const remaining = current.duration - current.currentTime
  if (remaining <= CROSSFADE_SECONDS) {
    isCrossfading = true
    next.currentTime = 0
    next.play().catch(() => {})
    activeSlot.value = nextSlot

    clearTimeout(resetTimer)
    resetTimer = window.setTimeout(() => {
      current.pause()
      current.currentTime = 0
      isCrossfading = false
    }, CROSSFADE_SECONDS * 1000)
  }
}

function handleEnded(slotIndex) {
  if (slotIndex !== activeSlot.value) return
  const videos = getVideos()
  const nextSlot = slotIndex === 0 ? 1 : 0
  const next = videos[nextSlot]
  if (!next) return
  next.currentTime = 0
  next.play().catch(() => {})
  activeSlot.value = nextSlot
  isCrossfading = false
}

onMounted(() => {
  videoA.value?.play().catch(() => {})
})

onUnmounted(() => {
  clearTimeout(resetTimer)
})
</script>

<template>
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <video
      ref="videoA"
      :src="src"
      autoplay
      muted
      playsinline
      preload="auto"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      :class="activeSlot === 0 ? 'opacity-100 z-[1]' : 'opacity-0 z-0'"
      @timeupdate="handleTimeUpdate(0)"
      @ended="handleEnded(0)"
    ></video>

    <video
      ref="videoB"
      :src="src"
      muted
      playsinline
      preload="auto"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      :class="activeSlot === 1 ? 'opacity-100 z-[1]' : 'opacity-0 z-0'"
      @timeupdate="handleTimeUpdate(1)"
      @ended="handleEnded(1)"
    ></video>
  </div>
</template>
