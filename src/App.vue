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
    <!-- iPhone 17 Pro Chassis (Desktop Preview) -->
    <div
      :class="
        activeDevice === 'mobile'
          ? 'relative w-full min-h-screen md:min-h-0 md:w-[416px] md:max-w-full md:h-[min(890px,calc(100dvh-2rem))] md:rounded-[58px] md:bg-[#1C1D22] md:p-[7px] md:shadow-[0_24px_60px_rgba(0,0,0,0.32)] md:ring-1 md:ring-white/25'
          : 'w-full min-h-screen'
      "
    >
      <!-- Hardware Side Buttons -->
      <template v-if="activeDevice === 'mobile'">
        <div
          class="hidden md:block absolute -left-[3px] top-[128px] w-[3px] h-[26px] rounded-l-sm bg-[#2C2D34]"
          aria-hidden="true"
        ></div>
        <div
          class="hidden md:block absolute -left-[3px] top-[172px] w-[3px] h-[48px] rounded-l-sm bg-[#2C2D34]"
          aria-hidden="true"
        ></div>
        <div
          class="hidden md:block absolute -left-[3px] top-[232px] w-[3px] h-[48px] rounded-l-sm bg-[#2C2D34]"
          aria-hidden="true"
        ></div>
        <div
          class="hidden md:block absolute -right-[3px] top-[192px] w-[3px] h-[72px] rounded-r-sm bg-[#2C2D34]"
          aria-hidden="true"
        ></div>
      </template>

      <!-- Inner Screen (402px wide on desktop) -->
      <div
        :class="
          activeDevice === 'mobile'
            ? 'relative w-full min-h-screen md:min-h-0 md:h-full md:rounded-[51px] md:overflow-hidden bg-white flex flex-col'
            : 'w-full min-h-screen bg-white flex flex-col'
        "
      >
        <!-- Dynamic Island Safe-Area Bar -->
        <div
          v-if="activeDevice === 'mobile'"
          class="hidden md:flex shrink-0 h-[44px] bg-white items-center justify-center relative z-50 select-none"
          aria-hidden="true"
        >
          <div class="w-[116px] h-[30px] rounded-full bg-black flex items-center justify-end pr-2.5 shadow-inner">
            <span class="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-slate-700/70"></span>
          </div>
        </div>

        <!-- Scrollable App Viewport -->
        <div
          ref="scrollContainerRef"
          :data-device="activeDevice"
          :class="
            activeDevice === 'mobile'
              ? 'w-full flex-1 min-h-0 bg-white flex flex-col md:overflow-y-auto md:overflow-x-clip'
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
    </div>
  </div>
</template>
