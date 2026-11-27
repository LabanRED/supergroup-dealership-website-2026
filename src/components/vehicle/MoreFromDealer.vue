<script setup>
import { ref, computed } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import { useStockFeed } from '../../composables/useStockFeed.js'
import { getDealerImage } from '../../utils/dealerImage.js'
import VehicleCard from './VehicleCard.vue'

const props = defineProps({
  dealerName: {
    type: String,
    default: '',
  },
  excludeId: {
    type: [Number, String],
    default: null,
  },
})

const { activeDevice } = useDevicePreview()
const { stockVehicles } = useStockFeed()
const trackRef = ref(null)
const dealerImage = computed(() => getDealerImage(props.dealerName))

const dealerVehicles = computed(() => {
  const pool = stockVehicles.value.filter((v) => v.id !== props.excludeId)
  if (!props.dealerName) return pool.slice(0, 12)
  const sameDealer = pool.filter((v) => v.dealer === props.dealerName)
  return (sameDealer.length >= 4 ? sameDealer : [...sameDealer, ...pool.filter((v) => v.dealer !== props.dealerName)]).slice(0, 12)
})

function scrollTrack(direction) {
  const track = trackRef.value
  if (!track) return
  const firstCard = track.firstElementChild
  const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : track.clientWidth / 4
  const maxScroll = track.scrollWidth - track.clientWidth

  if (direction > 0) {
    if (track.scrollLeft >= maxScroll - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: step, behavior: 'smooth' })
    }
  } else {
    if (track.scrollLeft <= 8) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <section class="!my-0 pt-2 pb-6 text-center">
    <div
      class="overflow-hidden rounded-[24px] mb-6 bg-neutral-100"
      :class="activeDevice === 'mobile' ? 'block' : 'block lg:hidden'"
    >
      <img
        :src="dealerImage"
        alt="Supergroup Dealership exterior"
        class="w-full h-auto object-cover"
      />
    </div>

    <h2 class="!text-neutral-600 font-normal leading-tight">
      <span class="block">More Listings From</span>
      <span class="block font-semibold text-[#0072BC]">This Dealer</span>
    </h2>

    <p class="mt-3 leading-relaxed max-w-2xl mx-auto" style="color: #0072BC;">
      Browse more quality vehicles available from this dealer. Explore a wider range of trusted listings, great deals, and options to suit your needs.
    </p>

    <div
      class="mt-6"
      :class="activeDevice === 'mobile' ? '' : 'lg:flex lg:items-center lg:gap-4'"
    >
      <!-- Desktop Left Chevron -->
      <button
        type="button"
        aria-label="Previous dealer listings"
        class="shrink-0 w-11 h-11 rounded-full bg-white border border-neutral-300 text-neutral-700 hover:border-[#0072BC] hover:text-[#0072BC] shadow-sm items-center justify-center transition-colors cursor-pointer"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden lg:flex'"
        @click="scrollTrack(-1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref="trackRef"
        class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-1 px-1"
        :class="activeDevice === 'mobile' ? '' : 'lg:flex-1 lg:min-w-0 lg:gap-5 lg:mx-0 lg:px-0'"
        style="scrollbar-width: none;"
      >
        <VehicleCard
          v-for="item in dealerVehicles"
          :key="`dealer-${item.id}`"
          :vehicle="item"
          class="w-[88%] shrink-0 snap-start"
          :class="activeDevice === 'mobile' ? '' : 'lg:w-[calc((100%-60px)/4)]'"
        />
      </div>

      <!-- Desktop Right Chevron -->
      <button
        type="button"
        aria-label="Next dealer listings"
        class="shrink-0 w-11 h-11 rounded-full items-center justify-center text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden lg:flex'"
        @click="scrollTrack(1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>
