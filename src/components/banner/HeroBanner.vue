<script setup>
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import CrossfadeVideo from './CrossfadeVideo.vue'
import mobileHeroVideo from '../../images/supergroup-dealerships-mobile-hero-banner-background.mp4'
import desktopHeroVideo from '../../images/supergroup-dealerships-desktop-hero-banner-background.mp4'
import supergroupSymbol from '../../images/supergroup-dealerships-logo-blue-white.webp'

const { activeDevice } = useDevicePreview()
</script>

<template>
  <section
    class="!mt-0 hero-fade-in w-full px-0 !mb-0"
  >
    <div
      class="relative overflow-hidden bg-[#000A31] text-white flex flex-col items-center justify-start text-center rounded-none"
      :class="
        activeDevice === 'mobile'
          ? 'px-6 pt-8 pb-[126px]'
          : 'px-6 pt-8 pb-[126px] md:min-h-[500px] md:px-14 md:pt-[50px] md:pb-24'
      "
    >
      <!-- Mobile Background Video (Crossfade Loop) -->
      <CrossfadeVideo
        :src="mobileHeroVideo"
        :class="activeDevice === 'mobile' ? 'block' : 'block md:hidden'"
      />

      <!-- Desktop Background Video (Crossfade Loop) -->
      <CrossfadeVideo
        :src="desktopHeroVideo"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:block'"
      />

      <!-- Subtle top dark scrim for text legibility -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-56 bg-gradient-to-b from-[#000A31]/70 to-transparent"
      ></div>

      <!-- Bottom white fade into page -->
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 md:h-48"
        style="
          background: linear-gradient(
            to top,
            #ffffff 0%,
            #ffffff 18%,
            rgba(255, 255, 255, 0.72) 55%,
            transparent 100%
          );
        "
      ></div>

      <!-- Background Supergroup Symbol (fades in and out behind hero text at 40% opacity) -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-4 z-[5] flex items-center justify-center hero-symbol-intro"
        :class="activeDevice === 'mobile' ? '' : 'md:top-[42px]'"
      >
        <img
          :src="supergroupSymbol"
          alt=""
          class="h-32 w-auto object-contain"
          :class="activeDevice === 'mobile' ? '' : 'md:h-52'"
        />
      </div>

      <!-- Hero Copy (fades in from small to big) -->
      <div class="relative z-10 flex flex-col items-center hero-copy-reveal">
        <p
          class="tracking-wide mb-2 text-white"
          :class="
            activeDevice === 'mobile'
              ? 'hero-welcome-mobile'
              : 'hero-welcome-mobile md:font-poppins md:font-normal md:uppercase md:!text-[36px] md:leading-[1.2] md:tracking-[0.04em] md:mb-1'
          "
        >
          Welcome to
        </p>

        <div class="relative inline-block">
          <h1
            class="relative z-10 font-poppins font-semibold bg-clip-text text-transparent select-none pb-2 text-[56px] leading-[54px]"
            :class="
              activeDevice === 'mobile'
                ? ''
                : 'md:text-[92px] md:leading-[96px] md:pb-2'
            "
            style="
              background-image: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.88) 48%, rgba(255, 255, 255, 0.25) 100%);
            "
          >
            Supergroup
          </h1>

          <!-- Sunflare shine on top-right of the letter "p" in "Supergroup" -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute top-[12px] -right-[1px] z-20 w-0 h-0 flex items-center justify-center"
            :class="activeDevice === 'mobile' ? '' : 'md:top-[22px] md:-right-[2px]'"
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
              class="relative w-2 h-2 rounded-full bg-white/80"
              style="box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.65), 0 0 20px 6px rgba(125, 211, 252, 0.45);"
            ></span>
            </div>
          </div>
        </div>

        <p
          class="font-poppins font-light mt-1 text-[24px] leading-[1.25] text-white"
          :class="
            activeDevice === 'mobile'
              ? ''
              : 'md:text-[36px] md:leading-[1.2] md:mt-0'
          "
        >
          Dealerships
        </p>
      </div>

      <!-- Desktop Search & Filter Slot (50px below Hero Copy) -->
      <div
        v-if="$slots.default"
        class="relative z-20 w-full mt-[50px]"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:block'"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-welcome-mobile {
  font-family: var(--font-guester);
  font-size: 20px;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-welcome-mobile.md\:font-poppins {
    font-family: var(--font-poppins), 'Poppins', sans-serif;
    font-size: 36px;
    line-height: 1.2;
  }
}

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
    opacity: 0.7;
    transform: scale(1);
  }
}

@keyframes sunflarePulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.95) rotate(0deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.06) rotate(6deg);
  }
}
</style>
