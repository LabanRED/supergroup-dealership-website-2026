<script setup>
import { computed } from 'vue'
import { useDevicePreview } from '../composables/useDevicePreview.js'
import { useWishlist } from '../composables/useWishlist.js'
import { vehicles } from '../data/vehicles.js'
import VehicleCard from '../components/vehicle/VehicleCard.vue'

const { activeDevice } = useDevicePreview()
const { favorites, clearWishlist } = useWishlist()

const wishlistedVehicles = computed(() =>
  vehicles.filter((v) => favorites.value.has(v.id))
)
</script>

<template>
  <div
    class="mx-auto max-w-[1600px] py-6"
    :class="activeDevice === 'mobile' ? 'px-[10px]' : 'px-[10px] md:px-10'"
  >
    <div class="max-w-md mx-auto space-y-5">
      <!-- Top Bar: Browse vehicles + Clear All -->
      <div class="flex items-center justify-between gap-3">
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
          v-if="wishlistedVehicles.length > 0"
          type="button"
          class="text-xs font-medium text-neutral-500 hover:text-[#0072BC] hover:underline transition-colors cursor-pointer"
          @click="clearWishlist"
        >
          Clear All
        </button>
      </div>

      <!-- My Wishlist Heading + Item Count -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 fill-[#D92D20] text-[#D92D20] shrink-0" viewBox="0 0 24 24">
            <path
              d="M12 21s-6.7-4.35-9.2-8.1C.8 9.9 2.3 5.5 6.4 4.8c2.2-.38 4.2.58 5.6 2.15 1.4-1.57 3.4-2.53 5.6-2.15 4.1.7 5.6 5.1 3.6 8.1C18.7 16.65 12 21 12 21z"
            />
          </svg>
          <h1 class="text-xl font-semibold text-[#0072BC]">My Wishlist</h1>
        </div>

        <span class="text-xs font-medium text-neutral-600">
          {{ wishlistedVehicles.length }} {{ wishlistedVehicles.length === 1 ? 'item' : 'items' }}
        </span>
      </div>

      <!-- Wishlisted Vehicles -->
      <div v-if="wishlistedVehicles.length > 0" class="space-y-5">
        <VehicleCard
          v-for="vehicle in wishlistedVehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="rounded-[24px] border border-neutral-200 bg-neutral-50 p-8 text-center space-y-4"
      >
        <div class="w-12 h-12 rounded-full bg-white border border-neutral-200 mx-auto flex items-center justify-center text-neutral-400">
          <svg class="w-6 h-6 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21s-6.7-4.35-9.2-8.1C.8 9.9 2.3 5.5 6.4 4.8c2.2-.38 4.2.58 5.6 2.15 1.4-1.57 3.4-2.53 5.6-2.15 4.1.7 5.6 5.1 3.6 8.1C18.7 16.65 12 21 12 21z"
            />
          </svg>
        </div>
        <div class="space-y-1">
          <p class="text-sm font-semibold text-neutral-800">Your wishlist is empty</p>
          <p class="text-xs text-neutral-500">
            Tap the heart icon on any vehicle in the showroom to save it here.
          </p>
        </div>
        <a
          href="#showroom"
          class="inline-block rounded-full py-2.5 px-6 text-xs font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity"
        >
          Browse Showroom
        </a>
      </div>
    </div>
  </div>
</template>
