<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from './composables/useDevicePreview.js'
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import HomePage from './pages/HomePage.vue'
import UnifiedInboxPage from './pages/UnifiedInboxPage.vue'
import PostingPage from './pages/PostingPage.vue'
import FramesPage from './pages/FramesPage.vue'
import ReviewsPage from './pages/ReviewsPage.vue'
import LiveChatAIPage from './pages/LiveChatAIPage.vue'

const { activeDevice } = useDevicePreview()

const pageMap = {
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
        ? 'min-h-screen bg-neutral-200 py-6 flex justify-center items-start'
        : 'w-full min-h-screen bg-white'
    "
  >
    <div
      :data-device="activeDevice"
      :class="
        activeDevice === 'mobile'
          ? 'w-[390px] max-w-full bg-white shadow-2xl rounded-[36px] overflow-y-auto overflow-x-clip border-8 border-neutral-900 my-6 h-[844px] max-h-[calc(100vh-4rem)] flex flex-col'
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
