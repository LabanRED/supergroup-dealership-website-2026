<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from './composables/useDevicePreview.js'
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import HomePage from './pages/HomePage.vue'
import ShowroomPage from './pages/ShowroomPage.vue'
import VehicleDetailPage from './pages/VehicleDetailPage.vue'
import FinancePage from './pages/FinancePage.vue'
import UnifiedInboxPage from './pages/UnifiedInboxPage.vue'
import PostingPage from './pages/PostingPage.vue'
import FramesPage from './pages/FramesPage.vue'
import ReviewsPage from './pages/ReviewsPage.vue'
import LiveChatAIPage from './pages/LiveChatAIPage.vue'

const { activeDevice } = useDevicePreview()

const pageMap = {
  '#showroom': ShowroomPage,
  '#vehicle-detail': VehicleDetailPage,
  '#finance': FinancePage,
  '#finance-pre-approval': FinancePage,
  '#unified-inbox': UnifiedInboxPage,
  '#posting': PostingPage,
  '#frames': FramesPage,
  '#reviews': ReviewsPage,
  '#livechat-ai': LiveChatAIPage,
}

const currentHash = ref(typeof window !== 'undefined' ? window.location.hash : '')
const scrollContainerRef = ref(null)

const currentPage = computed(() => {
  const baseHash = currentHash.value.split('?')[0]
  return pageMap[baseHash] || HomePage
})

const isVehicleDetail = computed(() => currentHash.value.split('?')[0] === '#vehicle-detail')
const isShowroom = computed(() => currentHash.value.split('?')[0] === '#showroom')

function handleHashChange() {
  const newHash = window.location.hash
  currentHash.value = newHash
  const baseHash = newHash.split('?')[0]
  if (pageMap[baseHash]) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (scrollContainerRef.value) {
      scrollContainerRef.value.scrollTop = 0
    }
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
      ref="scrollContainerRef"
      :data-device="activeDevice"
      :class="
        activeDevice === 'mobile'
          ? 'w-full min-h-screen bg-white flex flex-col md:w-[402px] md:max-w-full md:shadow-2xl md:rounded-[48px] md:overflow-y-auto md:overflow-x-clip md:ring-8 md:ring-neutral-900 md:my-6 md:h-[874px] md:max-h-[calc(100vh-4rem)]'
          : 'w-full min-h-screen bg-white flex flex-col'
      "
      :style="activeDevice === 'mobile' ? { scrollbarWidth: 'none' } : undefined"
    >
      <Header :sticky="!isVehicleDetail" :is-showroom="isShowroom" />
      <main class="flex-1">
        <component :is="currentPage" />
      </main>
      <Footer />
    </div>
  </div>
</template>
