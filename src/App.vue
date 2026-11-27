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

const { activeDevice, setDevice, isLocal } = useDevicePreview()

const previewModes = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'mobile', label: 'Mobile' },
]

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

function formatStatusTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const statusBarTime = ref(formatStatusTime())
let statusTimeInterval = null

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
  statusTimeInterval = window.setInterval(() => {
    statusBarTime.value = formatStatusTime()
  }, 30000)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
  if (statusTimeInterval) {
    window.clearInterval(statusTimeInterval)
  }
})
</script>

<template>
  <div
    :class="
      activeDevice === 'mobile' || activeDevice === 'tablet'
        ? 'w-full min-h-screen bg-white md:h-dvh md:overflow-hidden md:bg-neutral-200 md:p-4 md:flex md:justify-center md:items-center'
        : 'w-full min-h-screen bg-white'
    "
  >
    <!-- Floating Device Switcher when in Framed Mobile/Tablet Preview on Desktop -->
    <div
      v-if="isLocal && (activeDevice === 'mobile' || activeDevice === 'tablet')"
      class="hidden md:flex fixed top-4 right-4 z-[60] items-center gap-1 rounded-full bg-neutral-900/90 backdrop-blur-md p-1 shadow-lg ring-1 ring-white/15"
      title="Switch device preview"
    >
      <button
        v-for="mode in previewModes"
        :key="mode.id"
        type="button"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
        :class="
          activeDevice === mode.id
            ? 'bg-[#00A5C5] text-white'
            : 'text-neutral-300 hover:text-white'
        "
        @click="setDevice(mode.id)"
      >
        {{ mode.label }}
      </button>
    </div>

    <!-- iPhone 17 Pro / Tablet Chassis (Desktop Preview) -->
    <div
      :class="
        activeDevice === 'mobile'
          ? 'relative w-full min-h-screen md:min-h-0 md:w-[416px] md:max-w-full md:h-[min(890px,calc(100dvh-2rem))] md:rounded-[58px] md:bg-[#1C1D22] md:p-[7px] md:shadow-[0_24px_60px_rgba(0,0,0,0.32)] md:ring-1 md:ring-white/25'
          : activeDevice === 'tablet'
            ? 'relative w-full min-h-screen md:min-h-0 md:w-[820px] md:max-w-full md:h-[min(1180px,calc(100dvh-2rem))] md:rounded-[36px] md:bg-[#1C1D22] md:p-[10px] md:shadow-[0_24px_60px_rgba(0,0,0,0.32)] md:ring-1 md:ring-white/25'
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

      <!-- Inner Screen -->
      <div
        :class="
          activeDevice === 'mobile'
            ? 'relative w-full min-h-screen md:min-h-0 md:h-full md:rounded-[51px] md:overflow-hidden bg-white flex flex-col'
            : activeDevice === 'tablet'
              ? 'relative w-full min-h-screen md:min-h-0 md:h-full md:rounded-[28px] md:overflow-hidden bg-white flex flex-col'
              : 'w-full min-h-screen bg-white flex flex-col'
        "
      >
        <!-- Dynamic Island Status Bar -->
        <div
          v-if="activeDevice === 'mobile'"
          class="hidden md:flex shrink-0 h-[44px] px-6 bg-white items-center justify-between relative z-50 select-none text-neutral-900"
          aria-hidden="true"
        >
          <!-- Time -->
          <span class="w-[88px] text-[13px] font-semibold tracking-tight tabular-nums leading-none">
            {{ statusBarTime }}
          </span>

          <!-- Dynamic Island -->
          <div class="w-[116px] h-[30px] rounded-full bg-black flex items-center justify-end pr-2.5 shadow-inner shrink-0">
            <span class="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-slate-700/70"></span>
          </div>

          <!-- Signal, Wi-Fi & Battery Icons -->
          <div class="w-[88px] flex items-center justify-end gap-1.5">
            <!-- Cellular Signal -->
            <svg class="w-[16px] h-[11px] fill-current" viewBox="0 0 18 12">
              <rect x="0.5" y="8" width="2.8" height="3.5" rx="0.8" />
              <rect x="4.8" y="5.8" width="2.8" height="5.7" rx="0.8" />
              <rect x="9.1" y="3.3" width="2.8" height="8.2" rx="0.8" />
              <rect x="13.4" y="0.8" width="2.8" height="10.7" rx="0.8" />
            </svg>

            <!-- Wi-Fi Signal -->
            <svg class="w-[15px] h-[11px] fill-current" viewBox="0 0 16 12">
              <path d="M8 9.2a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Zm-3.1-1.9a4.6 4.6 0 0 1 6.2 0 .75.75 0 1 1-1.05 1.08 3.1 3.1 0 0 0-4.1 0 .75.75 0 1 1-1.05-1.08Zm-2.5-2.6a8.2 8.2 0 0 1 11.2 0 .75.75 0 1 1-1.05 1.07 6.7 6.7 0 0 0-9.1 0 .75.75 0 0 1-1.05-1.07ZM.2 2.2a11.4 11.4 0 0 1 15.6 0 .75.75 0 0 1-1.05 1.07 9.9 9.9 0 0 0-13.5 0A.75.75 0 0 1 .2 2.2Z" />
            </svg>

            <!-- Battery -->
            <svg class="w-[24px] h-[12px]" viewBox="0 0 27 13" fill="none">
              <rect x="1" y="1" width="22" height="11" rx="3" stroke="currentColor" stroke-width="1.5" />
              <rect x="3.2" y="3.2" width="16.5" height="6.6" rx="1.4" fill="currentColor" />
              <path d="M24.8 4.4v4.2a1.6 1.6 0 0 0 0-4.2Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <!-- Scrollable App Viewport -->
        <div
          ref="scrollContainerRef"
          :data-device="activeDevice"
          :class="
            activeDevice === 'mobile' || activeDevice === 'tablet'
              ? 'w-full flex-1 min-h-0 bg-white flex flex-col md:overflow-y-auto md:overflow-x-clip'
              : 'w-full min-h-screen bg-white flex flex-col'
          "
          :style="activeDevice === 'mobile' || activeDevice === 'tablet' ? { scrollbarWidth: 'none' } : undefined"
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
