<script setup>
import dealerImage from '../../images/suzuki-dealer-image.webp'
import { vehicles } from '../../data/vehicles'
import VehicleCard from './VehicleCard.vue'
</script>

<template>
  <section class="!my-0 pt-2 pb-6 text-center">
    <div class="overflow-hidden rounded-[24px] mb-6 bg-neutral-100">
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

    <p class="mt-3 leading-relaxed" style="color: #0072BC;">
      Browse more quality vehicles available from this dealer. Explore a wider range of trusted listings, great deals, and options to suit your needs.
    </p>

    <div
      class="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1"
      style="scrollbar-width: none;"
    >
      <VehicleCard
        v-for="item in vehicles"
        :key="`dealer-${item.id}`"
        :vehicle="item"
        class="w-[88%] shrink-0 snap-start"
      />
    </div>
  </section>
</template>
