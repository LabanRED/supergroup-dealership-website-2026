<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from './composables/useDevicePreview.js'
import { useScrollReveal } from './composables/useScrollReveal.js'
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import HomePage from './pages/HomePage.vue'
import ShowroomPage from './pages/ShowroomPage.vue'
import VehicleDetailPage from './pages/VehicleDetailPage.vue'
import FinancePage from './pages/FinancePage.vue'
import WishlistPage from './pages/WishlistPage.vue'
import UnifiedInboxPage from './pages/UnifiedInboxPage.vue'
import PostingPage from './pages/PostingPage.vue'
import FramesPage from './pages/FramesPage.vue'
import ReviewsPage from './pages/ReviewsPage.vue'
import LiveChatAIPage from './pages/LiveChatAIPage.vue'

const { activeDevice } = useDevicePreview()

const pageMap = {
  '#showroom': ShowroomPage,
  '#vehicle-detail': VehicleDetailPage,
  '#wishlist': WishlistPage,
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
const mainRef = ref(null)

useScrollReveal(mainRef, scrollContainerRef, [currentHash, activeDevice])

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
        ? 'w-full min-h-screen bg-white md:h-dvh md:overflow-hidden md:bg-neutral-200 md:p-4 md:flex md:justify-center md:items-center'
        : 'w-full min-h-screen bg-white'
    "
  >
    <div
      ref="scrollContainerRef"
      :data-device="activeDevice"
      :class="
        activeDevice === 'mobile'
          ? 'w-full min-h-screen bg-white flex flex-col md:min-h-0 md:w-[402px] md:max-w-full md:h-[874px] md:max-h-[calc(100dvh-2.5rem)] md:shadow-2xl md:rounded-[55px] md:overflow-y-auto md:overflow-x-clip md:ring-[10px] md:ring-neutral-900'
          : 'w-full min-h-screen bg-white flex flex-col'
      "
      :style="activeDevice === 'mobile' ? { scrollbarWidth: 'none' } : undefined"
    >
      <Header :sticky="!isVehicleDetail" :is-showroom="isShowroom" :is-vehicle-detail="isVehicleDetail" />
      <main ref="mainRef" class="flex-1">
        <component :is="currentPage" />
      </main>
      <Footer />
    </div>
  </div>
</template>
