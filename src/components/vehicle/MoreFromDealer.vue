<script setup>
import dealerImage from '../../images/suzuki-dealer-image.webp'
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
  </section>
</template>
