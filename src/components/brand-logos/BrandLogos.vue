<script setup>
const logoModules = import.meta.glob('../../images/brand-logos/*.webp', {
  eager: true,
  import: 'default',
})

const brands = Object.entries(logoModules)
  .map(([path, src]) => {
    const file = path.split('/').pop() || ''
    const name = file.replace(/\.webp$/i, '').replace(/[-_]/g, ' ')
    return { name, src }
  })
  .sort((a, b) => a.name.localeCompare(b.name))
</script>

<template>
  <section class="!mb-0 mx-auto max-w-[1400px] px-[20px] md:px-10 pt-6 pb-0">
    <div class="text-center mb-6">
      <p class="text-lg text-neutral-500 mb-1" style="color: #737373;">
        Representing
      </p>
      <h2>
        36 Distinguished Brands
      </h2>
    </div>

    <div class="relative overflow-hidden">
      <!-- Edge fades -->
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-white to-transparent z-10"
      ></div>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 bg-gradient-to-l from-white to-transparent z-10"
      ></div>

      <!-- Infinite marquee track -->
      <div class="brand-marquee-track flex w-max items-center hover:[animation-play-state:paused]">
        <div
          v-for="copy in 2"
          :key="copy"
          class="flex items-center gap-8 md:gap-12 pr-8 md:pr-12 shrink-0"
          :aria-hidden="copy === 2"
        >
          <div
            v-for="brand in brands"
            :key="`${copy}-${brand.name}`"
            class="shrink-0 flex items-center justify-center py-2"
          >
            <img
              :src="brand.src"
              :alt="brand.name"
              class="h-[62px] md:h-[70px] w-auto max-w-[160px] object-contain opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes brand-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.brand-marquee-track {
  animation: brand-marquee 45s linear infinite;
}
</style>
