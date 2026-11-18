<script setup>
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import mobileHeroVideo from '../../images/supergroup-dealerships-mobile-hero-banner-background.mp4'
import desktopHeroVideo from '../../images/supergroup-dealerships-desktop-hero-banner-background.mp4'
import supergroupSymbol from '../../images/supergroup-dealerships-logo-blue-white.webp'

const { activeDevice } = useDevicePreview()
</script>

<template>
  <section
    class="!mt-0 hero-fade-in"
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

      <!-- Background Supergroup Symbol (fades in and out behind hero text at 10% opacity) -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-4 md:top-12 z-[5] flex items-center justify-center hero-symbol-intro"
      >
        <img
          :src="supergroupSymbol"
          alt=""
          class="h-32 md:h-44 w-auto object-contain"
        />
      </div>

      <!-- Hero Copy (fades in from small to big) -->
      <div class="relative z-10 flex flex-col items-center hero-copy-reveal">
        <p
          class="tracking-wide mb-2"
          style="font-family: var(--font-guester); font-size: 20px; line-height: 1.2; color: #ffffff;"
        >
          Welcome to
        </p>

        <div class="relative inline-block">
          <h1
            class="relative z-10 font-poppins font-semibold bg-clip-text text-transparent select-none pb-2"
            style="
              font-size: 56px;
              line-height: 54px;
              font-weight: 600;
              background-image: linear-gradient(180deg, #ffffff 0%, #ffffff 55%, rgba(255, 255, 255, 0.55) 100%);
            "
          >
            Supergroup
          </h1>

          <!-- Sunflare shine on top-right of the letter "p" in "Supergroup" -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute top-[12px] -right-[1px] z-20 w-0 h-0 flex items-center justify-center"
          >
            <div class="w-24 h-24 shrink-0 flex items-center justify-center sunflare-shine">
            <!-- Outer atmospheric halo -->
            <span
              class="absolute inset-0 rounded-full"
              style="
                background: radial-gradient(
                  circle,
                  rgba(255, 255, 255, 0.9) 0%,
                  rgba(165, 226, 255, 0.55) 24%,
                  rgba(47, 166, 243, 0.22) 48%,
                  transparent 72%
                );
                filter: blur(3px);
              "
            ></span>
            <!-- Horizontal anamorphic flare streak -->
            <span
              class="absolute w-28 h-[2px]"
              style="
                background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%);
                filter: blur(0.5px);
              "
            ></span>
            <!-- Vertical flare ray -->
            <span
              class="absolute h-16 w-[1.5px]"
              style="
                background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%);
                filter: blur(0.5px);
              "
            ></span>
            <!-- Diagonal flare ray -->
            <span
              class="absolute w-14 h-[1px] rotate-45"
              style="
                background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.75) 50%, transparent 100%);
              "
            ></span>
            <!-- Bright sunflare core -->
            <span
              class="relative w-2.5 h-2.5 rounded-full bg-white"
              style="box-shadow: 0 0 12px 4px rgba(255, 255, 255, 0.95), 0 0 24px 8px rgba(125, 211, 252, 0.7);"
            ></span>
            </div>
          </div>
        </div>

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

<style scoped>
.hero-fade-in {
  animation: heroFadeIn 0.6s ease-out both;
}

.hero-symbol-intro {
  animation:
    symbolIntro 1.8s ease-in-out both,
    symbolBehindPulse 5s ease-in-out 1.8s infinite;
}

.hero-copy-reveal {
  animation: heroCopyReveal 0.85s cubic-bezier(0.22, 1, 0.36, 1) 1.25s both;
}

.sunflare-shine {
  animation:
    sunflareAppear 0.9s ease-out 1.85s both,
    sunflarePulse 3.6s ease-in-out 2.75s infinite;
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes symbolIntro {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
  65% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
}

@keyframes symbolBehindPulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.05;
    transform: scale(0.96);
  }
}

@keyframes heroCopyReveal {
  from {
    opacity: 0;
    transform: scale(0.82);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes sunflareAppear {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes sunflarePulse {
  0%,
  100% {
    opacity: 0.88;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.12) rotate(6deg);
  }
}
</style>
