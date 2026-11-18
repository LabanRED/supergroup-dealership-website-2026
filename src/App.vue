<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from './composables/useDevicePreview.js'
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import HomePage from './pages/HomePage.vue'
import ShowroomPage from './pages/ShowroomPage.vue'
import UnifiedInboxPage from './pages/UnifiedInboxPage.vue'
import PostingPage from './pages/PostingPage.vue'
import FramesPage from './pages/FramesPage.vue'
import ReviewsPage from './pages/ReviewsPage.vue'
import LiveChatAIPage from './pages/LiveChatAIPage.vue'

const { activeDevice } = useDevicePreview()

const pageMap = {
  '#showroom': ShowroomPage,
  '#unified-inbox': UnifiedInboxPage,
  '#posting': PostingPage,
  '#frames': FramesPage,
  '#reviews': ReviewsPage,
  '#livechat-ai': LiveChatAIPage,
}

const currentHash = ref(typeof window !== 'undefined' ? window.location.hash : '')

const currentPage = computed(() => {
  return pageMap[currentHash.value] || HomePage
})

function handleHashChange() {
  const newHash = window.location.hash
  currentHash.value = newHash
  if (pageMap[newHash]) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})
</script>

<template>
  <div
    :class="
      activeDevice === 'mobile'
        ? 'w-full min-h-screen bg-white md:bg-neutral-200 md:py-6 md:flex md:justify-center md:items-start'
        : 'w-full min-h-screen bg-white'
    "
  >
    <div
      :data-device="activeDevice"
      :class="
        activeDevice === 'mobile'
          ? 'w-full min-h-screen bg-white flex flex-col md:w-[390px] md:max-w-full md:shadow-2xl md:rounded-[36px] md:overflow-y-auto md:overflow-x-clip md:border-8 md:border-neutral-900 md:my-6 md:h-[844px] md:max-h-[calc(100vh-4rem)]'
          : 'w-full min-h-screen bg-white flex flex-col'
      "
      :style="activeDevice === 'mobile' ? { scrollbarWidth: 'none' } : undefined"
    >
      <Header />
      <main class="flex-1">
        <component :is="currentPage" />
      </main>
      <Footer />
    </div>
  </div>
</template>
