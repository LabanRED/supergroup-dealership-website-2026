<script setup>
import { ref } from 'vue'
import sellYourCarImage from '../../images/supergroup-sell-your-car-cart-image.webp'
import dealersImage from '../../images/supergroup-dealers-cart-image.webp'
import financeImage from '../../images/supergroup-finance-calculator-cart-image.webp'

const slides = [
  {
    id: 'sell',
    tab: 'Sell',
    title: 'Sell Your Car',
    image: sellYourCarImage,
    imageAlt: 'Sell your car with Supergroup Dealerships',
    description:
      "Super Group Dealerships not only sell the best quality vehicles we buy pre-owned vehicles too. Don't hesitate enquire and get the best offer for your vehicle today.",
    ctaLabel: 'Sell Car',
    ctaHref: '#contact',
  },
  {
    id: 'dealers',
    tab: 'Dealers',
    title: 'Our Dealers',
    image: dealersImage,
    imageAlt: 'Supergroup Dealerships showroom',
    description:
      'Super Group Dealerships offers a wide range of dealerships, bringing top brands and expert customer service together to meet your motoring needs',
    ctaLabel: 'Browse Now',
    ctaHref: '#contact',
  },
  {
    id: 'finance',
    tab: 'Finance',
    title: 'Finance Calculator',
    image: financeImage,
    imageAlt: 'Supergroup Dealerships finance consultation',
    description:
      'If you are still looking to purchase your vehicle and are interested in obtaining financial aid, then our finance and insurance products are for you.',
    ctaLabel: 'Calculate Now',
    ctaHref: '#contact',
  },
]

const trackRef = ref(null)
const activeIndex = ref(0)
let isProgrammaticScroll = false
let scrollTimeout = null

function scrollToIndex(index) {
  const track = trackRef.value
  if (!track) return

  activeIndex.value = index
  isProgrammaticScroll = true

  const targetLeft =
    index === 0
      ? 0
      : track.children[index]?.offsetLeft ?? 0

  track.scrollTo({
    left: targetLeft,
    behavior: 'smooth',
  })

  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll = false
  }, 450)
}

function handleScroll() {
  if (isProgrammaticScroll) return
  const track = trackRef.value
  if (!track) return

  const scrollLeft = track.scrollLeft
  let closest = 0
  let minDistance = Infinity

  Array.from(track.children).forEach((child, idx) => {
    const distance = Math.abs(child.offsetLeft - scrollLeft)
    if (distance < minDistance) {
      minDistance = distance
      closest = idx
    }
  })

  activeIndex.value = closest
}
</script>

<template>
  <section class="!mt-0 mx-auto max-w-[1400px] px-[20px] md:px-10 pt-0 pb-6">
    <!-- Section Heading -->
    <h2 class="text-center mb-6">
      Committed to Earning Your Trust
    </h2>

    <!-- 3 Category Pills -->
    <div class="grid grid-cols-3 gap-2.5 max-w-md mx-auto mb-6">
      <button
        v-for="(slide, idx) in slides"
        :key="slide.id"
        type="button"
        class="rounded-full py-2 px-4 text-xs md:text-sm font-medium transition-all cursor-pointer"
        :class="
          activeIndex === idx
            ? 'bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] text-white shadow-sm'
            : 'bg-[#EAEAEA] text-neutral-700 hover:bg-neutral-200'
        "
        @click="scrollToIndex(idx)"
      >
        {{ slide.tab }}
      </button>
    </div>

    <!-- Horizontal 3-Card Carousel Track (1 card at a time) -->
    <div
      ref="trackRef"
      class="relative flex overflow-x-auto snap-x snap-mandatory pb-4 max-w-md mx-auto"
      style="scrollbar-width: none;"
      @scroll="handleScroll"
    >
      <article
        v-for="slide in slides"
        :key="slide.id"
        class="snap-start shrink-0 w-full rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] flex flex-col justify-between"
      >
        <div>
          <h3 class="text-xl font-medium text-neutral-800 mb-4">
            {{ slide.title }}
          </h3>

          <div class="overflow-hidden rounded-2xl mb-5 aspect-[4/3] bg-neutral-100">
            <img
              :src="slide.image"
              :alt="slide.imageAlt"
              class="w-full h-full object-cover"
            />
          </div>

          <p class="text-sm text-neutral-600 leading-relaxed mb-6">
            {{ slide.description }}
          </p>
        </div>

        <a
          :href="slide.ctaHref"
          class="w-full rounded-full border border-[#0072BC] py-3 px-6 text-center text-sm font-medium text-[#0072BC] hover:bg-[#0072BC] hover:text-white transition-colors"
        >
          {{ slide.ctaLabel }}
        </a>
      </article>
    </div>

    <!-- Centered Circular Arrows -->
    <div class="flex items-center justify-center gap-4 mt-4">
      <button
        type="button"
        aria-label="Previous slide"
        class="w-11 h-11 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
        :class="
          activeIndex === 0
            ? 'border-neutral-300 text-neutral-400 cursor-not-allowed'
            : 'border-neutral-400 text-neutral-700 hover:border-[#0072BC] hover:text-[#0072BC]'
        "
        :disabled="activeIndex === 0"
        @click="scrollToIndex(Math.max(0, activeIndex - 1))"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next slide"
        class="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md transition-opacity cursor-pointer"
        :class="
          activeIndex === slides.length - 1
            ? 'bg-neutral-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] hover:opacity-95'
        "
        :disabled="activeIndex === slides.length - 1"
        @click="scrollToIndex(Math.min(slides.length - 1, activeIndex + 1))"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>
