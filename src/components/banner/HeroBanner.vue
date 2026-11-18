<script setup>
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import mobileHeroVideo from '../../images/supergroup-dealerships-mobile-hero-banner-background.mp4'
import desktopHeroVideo from '../../images/supergroup-dealerships-desktop-hero-banner-background.mp4'

const { activeDevice } = useDevicePreview()
</script>

<template>
  <section
    class="!mt-0"
    :class="
      activeDevice === 'mobile'
        ? 'w-full px-0 !mb-0'
        : 'w-full px-0 !mb-0 md:!mb-[30px] md:mx-auto md:max-w-[1400px] md:px-10 md:pt-6'
    "
  >
    <div
      class="relative overflow-hidden bg-[#000A31] text-white flex flex-col items-center justify-start text-center"
      :class="
        activeDevice === 'mobile'
          ? 'px-6 pt-8 pb-[126px] rounded-none'
          : 'px-6 pt-8 pb-[126px] md:min-h-[540px] md:px-14 md:pt-20 md:pb-32 md:rounded-[32px]'
      "
    >
      <!-- Mobile Background Video -->
      <video
        :src="mobileHeroVideo"
        autoplay
        loop
        muted
        playsinline
        class="absolute inset-0 w-full h-full object-cover"
        :class="activeDevice === 'mobile' ? 'block' : 'block md:hidden'"
      ></video>

      <!-- Desktop Background Video -->
      <video
        :src="desktopHeroVideo"
        autoplay
        loop
        muted
        playsinline
        class="absolute inset-0 w-full h-full object-cover"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:block'"
      ></video>

      <!-- Subtle top dark scrim for text legibility -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#000A31]/70 to-transparent"
      ></div>

      <!-- Bottom white fade into page -->
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-28 md:h-36 bg-gradient-to-t from-white via-white/40 to-transparent"
      ></div>

      <!-- Hero Copy -->
      <div class="relative z-10 flex flex-col items-center">
        <p
          class="uppercase tracking-wide mb-2"
          style="font-family: var(--font-guester); font-size: 20px; line-height: 1.2; color: #ffffff;"
        >
          Welcome to
        </p>

        <h1
          class="font-poppins font-semibold bg-clip-text text-transparent select-none pb-2"
          style="
            font-size: 56px;
            line-height: 54px;
            font-weight: 600;
            background-image: linear-gradient(180deg, #ffffff 0%, #ffffff 55%, rgba(255, 255, 255, 0.55) 100%);
          "
        >
          Supergroup
        </h1>

        <p
          class="font-poppins font-light mt-1"
          style="font-size: 24px; line-height: 1.25; font-weight: 300; color: #ffffff;"
        >
          Dealerships
        </p>
      </div>
    </div>
  </section>
</template>
