<script setup>
import { ref } from 'vue'
import VehicleOverview from '../components/vehicle/VehicleOverview.vue'
import VehicleSpecifications from '../components/vehicle/VehicleSpecifications.vue'
import SupergroupDivider from '../components/common/SupergroupDivider.vue'
import VehicleEnquire from '../components/vehicle/VehicleEnquire.vue'
import DealerLocation from '../components/vehicle/DealerLocation.vue'
import MoreFromDealer from '../components/vehicle/MoreFromDealer.vue'
import SimilarVehicles from '../components/vehicle/SimilarVehicles.vue'

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

const isFavorite = ref(true)
const activeIndex = ref(0)
const mainTrackRef = ref(null)

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
</script>

<template>
  <div class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-6">
    <div class="max-w-md mx-auto space-y-5">
      <!-- Top Bar: Browse vehicles + Favorite Heart -->
      <div class="flex items-center justify-between">
        <a
          href="#showroom"
          class="inline-flex items-center gap-2 text-xs font-medium text-[#0072BC] hover:underline"
        >
          <span
            class="w-7 h-7 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-700"
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
          :class="isFavorite ? 'bg-[#D92D20] text-white' : 'border border-neutral-300 text-neutral-600'"
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
          <div class="text-xs text-neutral-500 mb-1">Price</div>
          <div class="text-[42px] font-semibold text-[#0072BC] leading-none whitespace-nowrap">
            {{ vehicle.price }}
          </div>
        </div>

        <div class="shrink-0 border-l border-[#969696] pl-[10px] space-y-1">
          <div class="text-[13px] text-neutral-500">Est. Payment</div>
          <div class="text-[14px] font-medium text-neutral-800 flex items-center gap-1">
            <span>{{ vehicle.estPayment }}</span>
            <span
              class="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-neutral-400 text-[9px] text-neutral-500"
            >
              i
            </span>
          </div>
        </div>
      </div>

      <!-- Title & Trim -->
      <div>
        <h1
          class="font-poppins font-medium text-[#0072BC] uppercase"
          style="font-size: 24px; line-height: 1.2; font-weight: 500;"
        >
          {{ vehicle.name }}
        </h1>
        <p class="text-xs text-neutral-500 uppercase mt-1" style="color: #737373; font-size: 12px;">
          {{ vehicle.trim }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <button
          type="button"
          class="rounded-full border border-neutral-800 py-3 px-4 text-center text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          Calculator
        </button>
        <button
          type="button"
          class="rounded-full py-3 px-4 text-center text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
          @click="scrollToEnquire"
        >
          Enquire
        </button>
      </div>

      <!-- Main Scrollable Gallery -->
      <div class="space-y-3">
        <div class="relative aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100">
          <div
            ref="mainTrackRef"
            class="flex w-full h-full overflow-x-auto snap-x snap-mandatory"
            style="scrollbar-width: none;"
            @scroll="handleMainScroll"
          >
            <img
              v-for="(img, idx) in vehicle.images"
              :key="idx"
              :src="img"
              :alt="`${vehicle.name} photo ${idx + 1}`"
              class="w-full h-full shrink-0 snap-start object-cover"
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

      <!-- Dealership Location Section -->
      <DealerLocation dealer-name="Suzuki Edenvale" />

      <!-- More Listings From This Dealer -->
      <MoreFromDealer />

      <!-- Similar Vehicles -->
      <SimilarVehicles />
    </div>
  </div>
</template>
