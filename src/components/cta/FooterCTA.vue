<script setup>
import ctaImage from '../../images/get-in-touch-cta-image.webp'
</script>

<template>
  <section id="contact" class="mx-auto max-w-[1400px] px-[10px] md:px-10 py-6">
    <div class="max-w-md mx-auto text-center">
      <div class="overflow-hidden rounded-[24px] mb-6 bg-neutral-100">
        <img
          :src="ctaImage"
          alt="Supergroup Dealerships showroom experience"
          class="w-full h-auto object-cover"
        />
      </div>

      <h2 class="mb-4">
        <span class="block">Ready for a Better</span>
        <span class="block text-neutral-900">Kind of Dealership Experience?</span>
      </h2>

      <p class="text-neutral-700 leading-relaxed mb-6" style="color: #404040;">
        Whether you are upgrading the family SUV, hunting for a reliable pre-owned gem, or booking your next service, your local Super Group team is ready to welcome you in.
      </p>

      <a
        href="#showroom"
        class="block w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity"
      >
        Browse Showroom
      </a>
    </div>
  </section>
</template>
