<script setup>
import { ref } from 'vue'
import { createDragScrollHandler } from '../../composables/useDragScroll.js'
import mileageIcon from '../../images/supergroup-dealerships-mileage-icon.svg'
import fuelIcon from '../../images/supergroup-dealerships-fuel-type-icon.svg'
import transmissionIcon from '../../images/supergroup-dealerships-transmission-icon.svg'

defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
})

const isFavorite = ref(false)
const activeImage = ref(0)
const galleryRef = ref(null)
const handleGalleryMouseDown = createDragScrollHandler({ snapToSlide: true })

function onImageScroll(event) {
  const el = event.target
  if (!el || !el.clientWidth) return
  activeImage.value = Math.round(el.scrollLeft / el.clientWidth)
}

function scrollVehicleImage(idx) {
  activeImage.value = idx
  const track = galleryRef.value
  if (!track) return
  track.scrollTo({
    left: idx * track.clientWidth,
    behavior: 'smooth',
  })
}
</script>

<template>
  <article
    class="rounded-[24px] border border-neutral-100 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)] overflow-hidden text-left"
  >
    <!-- Scrollable Vehicle Photo Gallery with Condition Pill & Favorite Heart -->
    <div class="relative aspect-[16/11] bg-neutral-100 overflow-hidden">
      <div
        ref="galleryRef"
        class="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none"
        style="scrollbar-width: none;"
        @scroll="onImageScroll"
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

      <span
        v-if="vehicle.condition !== 'Used'"
        class="absolute top-3 left-3 px-3.5 py-1 rounded-full text-xs font-medium shadow-sm"
        :class="
          vehicle.condition === 'Demo'
            ? 'bg-white text-[#0072BC]'
            : 'bg-[#0072BC] text-white'
        "
      >
        {{ vehicle.condition }}
      </span>

      <button
        type="button"
        aria-label="Save vehicle"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center cursor-pointer transition-transform active:scale-95"
        @click="isFavorite = !isFavorite"
      >
        <svg
          class="w-4 h-4"
          :class="isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-red-500'"
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

    <div class="p-5">
      <!-- Photo Count + Carousel Dots -->
      <div class="flex items-center justify-center gap-3 mb-4">
        <span class="inline-flex items-center gap-1 text-xs font-medium text-[#0072BC]">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path
              d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"
            />
          </svg>
          <span>{{ vehicle.images.length >= 12 ? '12+' : vehicle.images.length }}</span>
        </span>

        <div class="flex items-center gap-1.5">
          <button
            v-for="(_, idx) in vehicle.images"
            :key="idx"
            type="button"
            :aria-label="`View photo ${idx + 1}`"
            class="w-2 h-2 rounded-full transition-colors cursor-pointer"
            :class="activeImage === idx ? 'bg-[#0072BC]' : 'bg-neutral-300'"
            @click="scrollVehicleImage(idx)"
          ></button>
        </div>
      </div>

      <!-- Title & Trim -->
      <h3 class="text-base font-semibold text-neutral-800 uppercase leading-snug">
        {{ vehicle.name }}
      </h3>
      <p class="text-xs text-neutral-500 uppercase mt-0.5 mb-4" style="color: #737373; font-size: 12px;">
        {{ vehicle.trim }}
      </p>

      <!-- Price & Est. Payment Split -->
      <div class="flex items-center justify-between gap-[10px] mb-5">
        <div class="min-w-0">
          <div class="text-xs text-neutral-500 mb-1">Price</div>
          <div class="text-[32px] sm:text-[38px] font-semibold text-[#0072BC] leading-none whitespace-nowrap">
            {{ vehicle.price }}
          </div>
        </div>

        <div class="shrink-0 border-l border-[#969696] pl-[10px] space-y-1.5">
          <div class="text-[11px] text-neutral-500">Est. Payment</div>
          <div class="text-xs font-medium text-neutral-800 flex items-center gap-1">
            <span>{{ vehicle.estPayment }}</span>
            <span
              class="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-neutral-400 text-[9px] text-neutral-500"
            >
              i
            </span>
          </div>
          <button
            type="button"
            class="w-full rounded bg-neutral-300/80 hover:bg-neutral-300 py-1.5 px-3 text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
          >
            Calculator
          </button>
        </div>
      </div>

      <!-- 3-Icon Spec Row -->
      <div class="grid grid-cols-3 gap-2 py-2 text-xs text-neutral-700 mb-3">
        <div class="flex items-center gap-1.5">
          <img :src="mileageIcon" alt="" class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ vehicle.mileage }}</span>
        </div>
        <div class="flex items-center justify-center gap-1.5">
          <img :src="fuelIcon" alt="" class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ vehicle.fuelType }}</span>
        </div>
        <div class="flex items-center justify-end gap-1.5">
          <img :src="transmissionIcon" alt="" class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ vehicle.transmission }}</span>
        </div>
      </div>

      <!-- Dealer Location -->
      <div class="flex items-center justify-center gap-1.5 text-xs text-neutral-700 mb-5">
        <svg class="w-4 h-4 text-[#0072BC] fill-current shrink-0" viewBox="0 0 24 24">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
          />
        </svg>
        <span>{{ vehicle.dealer }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <a
          href="#contact"
          class="rounded-full border border-neutral-800 py-2.5 px-4 text-center text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors"
        >
          Enquire Now
        </a>
        <a
          href="#vehicle-detail"
          class="rounded-full py-2.5 px-4 text-center text-xs font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity"
        >
          View Details
        </a>
      </div>
    </div>
  </article>
</template>
