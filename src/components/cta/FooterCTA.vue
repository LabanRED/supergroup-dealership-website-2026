<script setup>
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import ctaImage from '../../images/get-in-touch-cta-image.webp'

const { activeDevice } = useDevicePreview()
</script>

<template>
  <section id="contact" class="mx-auto max-w-[1600px] px-[10px] md:px-10 py-6 md:py-10">
    <!-- Mobile Layout -->
    <div
      class="max-w-md mx-auto text-center"
      :class="activeDevice === 'mobile' ? 'block' : 'block lg:hidden'"
    >
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

    <!-- Desktop 2-Column Card Layout -->
    <div
      class="rounded-[28px] border border-neutral-200 bg-white p-10 xl:p-12 grid-cols-2 gap-12 items-center"
      :class="activeDevice === 'mobile' ? 'hidden' : 'hidden lg:grid'"
    >
      <!-- Left Column: Copy + CTA -->
      <div class="text-left">
        <h2
          class="font-poppins font-medium"
          style="font-size: 64px; line-height: 72px; font-weight: 500;"
        >
          <span class="block text-[#0072BC]">Ready for a Better</span>
          <span class="block text-neutral-900">Kind of Dealership Experience?</span>
        </h2>

        <p
          class="font-poppins font-normal text-neutral-700 mt-[50px] max-w-xl"
          style="font-size: 16px; line-height: 32px; color: #404040;"
        >
          Whether you are upgrading the family SUV, hunting for a reliable pre-owned gem, or booking your next service, your local Super Group team is ready to welcome you in.
        </p>

        <div class="mt-[50px]">
          <a
            href="#showroom"
            class="inline-flex items-center justify-center min-w-[240px] rounded-full py-3.5 px-10 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity"
          >
            Browse Showroom
          </a>
        </div>
      </div>

      <!-- Right Column: Rounded Image -->
      <div class="overflow-hidden rounded-[24px] bg-neutral-100 h-full">
        <img
          :src="ctaImage"
          alt="Supergroup Dealerships showroom experience"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>
</template>
