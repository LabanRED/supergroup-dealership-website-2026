<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from '../composables/useDevicePreview.js'
import { createDragScrollHandler } from '../composables/useDragScroll.js'
import VehicleOverview from '../components/vehicle/VehicleOverview.vue'
import VehicleSpecifications from '../components/vehicle/VehicleSpecifications.vue'
import SupergroupDivider from '../components/common/SupergroupDivider.vue'
import VehicleEnquire from '../components/vehicle/VehicleEnquire.vue'
import FinanceCalculator from '../components/vehicle/FinanceCalculator.vue'
import DealerLocation from '../components/vehicle/DealerLocation.vue'
import MoreFromDealer from '../components/vehicle/MoreFromDealer.vue'
import SimilarVehicles from '../components/vehicle/SimilarVehicles.vue'

const { activeDevice } = useDevicePreview()
const handleGalleryMouseDown = createDragScrollHandler({ snapToSlide: true })
const clioModules = import.meta.glob('../images/clio-*.jpg', {
  eager: true,
  import: 'default',
})

const clioGallery = Object.entries(clioModules)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/clio-(\d+)\.jpg$/)?.[1] || 0)
    const numB = Number(b.match(/clio-(\d+)\.jpg$/)?.[1] || 0)
    return numA - numB
  })
  .map(([, src]) => src)

const vehicle = {
  name: '2023 RENAULT CLIO',
  trim: '1.0T ZEN 5DR (66KW)',
  condition: 'Used',
  priceValue: 199900,
  price: 'R199 900',
  estPayment: 'R3 580 p/m*',
  mileage: '43 987 km',
  fuelType: 'Petrol',
  transmission: 'Manual',
  dealer: 'Suzuki Edenvale',
  description:
    'The price you see is the price you pay - no hidden admin fees or on-road costs. This well-maintained 2023 Renault Clio 1.0T Zen in white blends a full service history with efficient turbocharged performance.',
  images: clioGallery,
}

const isFavorite = ref(false)
const isScrolled = ref(false)
const topSectionRef = ref(null)
const activeIndex = ref(0)
const mainTrackRef = ref(null)
let scrollContainer = null

function updateScrollState() {
  const containerScroll = scrollContainer ? scrollContainer.scrollTop : 0
  isScrolled.value = window.scrollY > 10 || containerScroll > 10
}

onMounted(() => {
  scrollContainer = topSectionRef.value?.closest('[data-device]') || null
  if (scrollContainer) {
    scrollContainer.scrollTop = 0
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
  isScrolled.value = false
  window.addEventListener('scroll', updateScrollState, { passive: true })
  scrollContainer?.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  scrollContainer?.removeEventListener('scroll', updateScrollState)
})

function selectPhoto(idx) {
  activeIndex.value = idx
  const track = mainTrackRef.value
  if (!track) return
  track.scrollTo({
    left: idx * track.clientWidth,
    behavior: 'smooth',
  })
}

function handleMainScroll(event) {
  const el = event.target
  if (!el || !el.clientWidth) return
  activeIndex.value = Math.round(el.scrollLeft / el.clientWidth)
}

function scrollToEnquire() {
  document.getElementById('vdp-enquire')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToCalculator() {
  document.getElementById('vdp-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div
    class="mx-auto max-w-[1400px] py-6"
    :class="activeDevice === 'mobile' ? 'px-[20px]' : 'px-[20px] md:px-10'"
  >
    <div class="max-w-md mx-auto space-y-5">
      <!-- Sticky Top Section (White at rest, Dark on scroll) -->
      <div
        ref="topSectionRef"
        class="sticky top-0 z-40 -mx-[20px] -mt-6 px-[20px] pt-5 pb-4 transition-colors duration-200 space-y-4"
        :class="isScrolled ? 'bg-[#111111] border-b border-white/10 shadow-md' : 'bg-white'"
      >
        <!-- Top Bar: Browse vehicles + Favorite Heart -->
        <div class="flex items-center justify-between">
          <a
            href="#showroom"
            class="inline-flex items-center gap-2 text-xs font-medium hover:underline transition-colors"
            :class="isScrolled ? 'text-[#2FA6F3]' : 'text-[#0072BC]'"
          >
            <span
              class="w-7 h-7 rounded-full border flex items-center justify-center transition-colors"
              :class="isScrolled ? 'border-white/70 text-white' : 'border-neutral-400 text-neutral-700'"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span>Browse vehicles</span>
          </a>

          <button
            type="button"
            aria-label="Save vehicle"
            class="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            :class="
              isFavorite
                ? 'bg-[#D92D20] text-white'
                : isScrolled
                  ? 'border border-white/70 text-white'
                  : 'border border-neutral-800 text-neutral-800'
            "
            @click="isFavorite = !isFavorite"
          >
            <svg
              class="w-4 h-4"
              :class="isFavorite ? 'fill-current' : 'fill-none stroke-current'"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21s-6.7-4.35-9.2-8.1C.8 9.9 2.3 5.5 6.4 4.8c2.2-.38 4.2.58 5.6 2.15 1.4-1.57 3.4-2.53 5.6-2.15 4.1.7 5.6 5.1 3.6 8.1C18.7 16.65 12 21 12 21z"
              />
            </svg>
          </button>
        </div>

        <!-- Price & Est. Payment Split -->
        <div class="flex items-center justify-start gap-[10px]">
          <div class="min-w-0">
            <div
              class="text-xs mb-1 transition-colors"
              :class="isScrolled ? 'text-white' : 'text-neutral-500'"
            >
              Price
            </div>
            <div
              class="text-[42px] font-semibold leading-none whitespace-nowrap transition-colors"
              :class="isScrolled ? 'text-[#2FA6F3]' : 'text-[#0072BC]'"
            >
              {{ vehicle.price }}
            </div>
          </div>

          <div
            class="shrink-0 border-l pl-[10px] space-y-1 transition-colors"
            :class="isScrolled ? 'border-white/70' : 'border-[#969696]'"
          >
            <div
              class="text-[13px] transition-colors"
              :class="isScrolled ? 'text-white' : 'text-neutral-500'"
            >
              Est. Payment
            </div>
            <div
              class="text-[14px] font-medium flex items-center gap-1 transition-colors"
              :class="isScrolled ? 'text-white' : 'text-neutral-800'"
            >
              <span>{{ vehicle.estPayment }}</span>
              <span
                class="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border text-[9px] transition-colors"
                :class="isScrolled ? 'border-white/80 text-white' : 'border-neutral-400 text-neutral-500'"
              >
                i
              </span>
            </div>
          </div>
        </div>

        <!-- Title & Trim -->
        <div>
          <h1
            class="font-poppins font-medium uppercase transition-colors"
            :class="isScrolled ? 'text-[#2FA6F3]' : 'text-[#0072BC]'"
            style="font-size: 24px; line-height: 1.2; font-weight: 500;"
          >
            {{ vehicle.name }}
          </h1>
          <p
            class="text-xs uppercase mt-1 transition-colors"
            :class="isScrolled ? 'text-white' : 'text-neutral-500'"
            style="font-size: 12px;"
          >
            {{ vehicle.trim }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            class="rounded-full border py-2.5 px-2.5 flex items-center justify-center whitespace-nowrap font-medium transition-colors cursor-pointer"
            :class="[
              activeDevice === 'mobile' ? 'text-xs' : 'text-xs sm:text-sm',
              isScrolled
                ? 'border-white text-white hover:bg-white/10'
                : 'border-neutral-800 text-neutral-800 hover:bg-neutral-100',
            ]"
            @click="scrollToCalculator"
          >
            Finance
          </button>
          <button
            type="button"
            class="rounded-full py-2.5 px-2.5 flex items-center justify-center whitespace-nowrap font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            :class="activeDevice === 'mobile' ? 'text-xs' : 'text-xs sm:text-sm'"
            @click="scrollToEnquire"
          >
            Enquire
          </button>
          <a
            href="#finance-pre-approval?dealerName=Suzuki+Edenvale&make=RENAULT&model=Clio&newused=USED&price=199900&variant=1.0T+ZEN+5DR+(66KW)&year=2023"
            class="rounded-full border py-2.5 px-2.5 flex items-center justify-center whitespace-nowrap font-medium transition-colors cursor-pointer"
            :class="[
              activeDevice === 'mobile' ? 'text-xs' : 'text-xs sm:text-sm',
              isScrolled
                ? 'border-white text-white hover:bg-white/10'
                : 'border-neutral-800 text-neutral-800 hover:bg-neutral-100',
            ]"
          >
            Pre-Approval
          </a>
        </div>
      </div>

      <!-- Main Scrollable Gallery -->
      <div class="space-y-3">
        <div class="relative aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100">
          <div
            ref="mainTrackRef"
            class="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none"
            style="scrollbar-width: none;"
            @scroll="handleMainScroll"
            @mousedown="handleGalleryMouseDown"
            @dragstart.prevent
          >
            <img
              v-for="(img, idx) in vehicle.images"
              :key="idx"
              :src="img"
              :alt="`${vehicle.name} photo ${idx + 1}`"
              draggable="false"
              class="w-full h-full shrink-0 snap-start snap-always object-cover"
            />
          </div>
        </div>

        <!-- Thumbnail Strip -->
        <div
          class="flex items-center gap-2 overflow-x-auto pb-1"
          style="scrollbar-width: none;"
        >
          <button
            v-for="(img, idx) in vehicle.images"
            :key="idx"
            type="button"
            class="shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer"
            :class="activeIndex === idx ? 'border-[#0072BC]' : 'border-transparent opacity-75 hover:opacity-100'"
            @click="selectPhoto(idx)"
          >
            <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>

        <!-- Pagination Dots -->
        <div class="flex items-center justify-center gap-1.5">
          <button
            v-for="(_, idx) in vehicle.images"
            :key="idx"
            type="button"
            :aria-label="`Select photo ${idx + 1}`"
            class="w-2 h-2 rounded-full transition-colors cursor-pointer"
            :class="activeIndex === idx ? 'bg-[#0072BC]' : 'bg-neutral-300'"
            @click="selectPhoto(idx)"
          ></button>
        </div>
      </div>

      <!-- Vehicle Description -->
      <section class="!my-0 pt-2 space-y-3">
        <h2>Vehicle Description</h2>
        <p class="text-sm text-neutral-700 leading-relaxed" style="color: #404040;">
          {{ vehicle.description }}
        </p>
      </section>

      <!-- Overview Section -->
      <VehicleOverview
        mileage="43 987 Km"
        exterior-colour="White"
        body-type="Hatch"
        transmission="Manual"
        engine-size="999 Cc"
        fuel-type="Petrol"
      />

      <!-- Additional Specifications Section -->
      <VehicleSpecifications />

      <!-- Divider -->
      <SupergroupDivider />

      <!-- Enquire Section -->
      <VehicleEnquire />

      <!-- Finance Calculator Section -->
      <section id="vdp-calculator" class="!my-0 pt-2 pb-4 scroll-mt-56 space-y-4">
        <div class="overflow-hidden rounded-[24px] bg-neutral-100 aspect-[16/11]">
          <img
            :src="vehicle.images[0]"
            :alt="vehicle.name"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="space-y-1">
          <div class="text-xs font-semibold uppercase tracking-wide text-[#0072BC]">
            CAN I AFFORD IT?
          </div>
          <p class="text-base font-normal text-neutral-800 leading-relaxed">
            Assessing affordability is an important part of making a well-informed decision. We're here to help you every step of the way.
          </p>
        </div>

        <FinanceCalculator
          :vehicle="vehicle"
          :closable="false"
        />
      </section>

      <!-- Dealership Location Section -->
      <DealerLocation dealer-name="Suzuki Edenvale" />

      <!-- More Listings From This Dealer -->
      <MoreFromDealer />

      <!-- Similar Vehicles -->
      <SimilarVehicles />
    </div>
  </div>
</template>
