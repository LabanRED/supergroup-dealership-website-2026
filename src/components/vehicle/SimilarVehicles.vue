<script setup>
import { vehicles } from '../../data/vehicles'
import VehicleCard from './VehicleCard.vue'
</script>

<template>
  <section class="!my-0 pt-4 pb-6 text-center">
    <h2 class="!text-neutral-700 font-normal leading-tight">
      Similar Cars <span class="font-semibold">Listings</span>
    </h2>

    <p class="mt-3 leading-relaxed" style="color: #0072BC;">
      Explore more vehicles that match your style, budget, and driving needs. Discover similar listings with great features and competitive pricing.
    </p>

    <div
      class="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1"
      style="scrollbar-width: none;"
    >
      <VehicleCard
        v-for="item in vehicles"
        :key="`similar-${item.id}`"
        :vehicle="item"
        class="w-[88%] shrink-0 snap-start"
      />
    </div>
  </section>
</template>
