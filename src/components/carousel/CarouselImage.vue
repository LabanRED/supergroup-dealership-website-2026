<script setup>
import { ref } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import sellYourCarImage from '../../images/supergroup-sell-your-car-cart-image.webp'
import dealersImage from '../../images/supergroup-dealers-cart-image.webp'
import financeImage from '../../images/supergroup-finance-calculator-cart-image.webp'

const { activeDevice } = useDevicePreview()

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
const activeIndex = ref(1)
let isProgrammaticScroll = false
let scrollTimeout = null
let dragStartX = 0
let isDraggingStage = false

function scrollToIndex(index) {
  const normalized = (index + slides.length) % slides.length
  activeIndex.value = normalized

  const track = trackRef.value
  if (!track) return

  isProgrammaticScroll = true

  const targetLeft =
    normalized === 0
      ? 0
      : track.children[normalized]?.offsetLeft ?? 0

  track.scrollTo({
    left: targetLeft,
    behavior: 'smooth',
  })

  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll = false
  }, 450)
}

function getDesktopCardStyle(index) {
  const rel = (index - activeIndex.value + slides.length) % slides.length
  if (rel === 0) {
    return {
      transform: 'translateX(0%) scale(1) rotateY(0deg)',
      zIndex: 30,
      opacity: 1,
    }
  }
  if (rel === 1) {
    return {
      transform: 'translateX(64%) scale(0.84) rotateY(-12deg)',
      zIndex: 10,
      opacity: 0.78,
    }
  }
  return {
    transform: 'translateX(-64%) scale(0.84) rotateY(12deg)',
    zIndex: 10,
    opacity: 0.78,
  }
}

function onStageMouseDown(event) {
  if (event.button !== 0) return
  isDraggingStage = true
  dragStartX = event.clientX
}

function onStageMouseUp(event) {
  if (!isDraggingStage) return
  isDraggingStage = false
  const dx = event.clientX - dragStartX
  if (Math.abs(dx) < 40) return
  scrollToIndex(dx < 0 ? activeIndex.value + 1 : activeIndex.value - 1)
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
  <section class="!mt-0 mx-auto max-w-[1600px] px-[10px] md:px-10 pt-[50px] pb-6">
    <!-- Mobile Section Heading -->
    <h2
      class="text-center mb-6"
      :class="activeDevice === 'mobile' ? 'block' : 'block md:hidden'"
    >
      Committed to Earning Your Trust
    </h2>

    <!-- Desktop Section Heading -->
    <h2
      class="text-center font-poppins md:mb-[50px]"
      :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:block'"
      style="font-size: 48px; line-height: 64px;"
    >
      <span class="block font-normal text-[#A7A9AC]">Raising The Standard In</span>
      <span class="block font-medium text-[#0072BC]">Customer Satisfaction</span>
    </h2>

    <!-- 3 Category Pills -->
    <div
      class="grid grid-cols-3 gap-2.5 max-w-md mx-auto"
      :class="activeDevice === 'mobile' ? 'mb-6' : 'mb-6 md:mb-[50px]'"
    >
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

    <!-- Mobile Horizontal 3-Card Carousel Track (1 card at a time) -->
    <div
      ref="trackRef"
      class="relative flex overflow-x-auto snap-x snap-mandatory pb-4 max-w-md mx-auto"
      :class="activeDevice === 'mobile' ? 'flex' : 'flex md:hidden'"
      style="scrollbar-width: none;"
      @scroll="handleScroll"
    >
      <article
        v-for="slide in slides"
        :key="slide.id"
        class="snap-start shrink-0 w-full rounded-[28px] border border-neutral-200 hover:border-[#0072BC] transition-colors bg-white p-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] flex flex-col justify-between"
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

    <!-- Desktop Single-Row Rotating Coverflow Stage -->
    <div
      data-no-reveal
      class="relative mx-auto max-w-[1100px] min-h-[540px] items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
      :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:flex'"
      style="perspective: 1200px;"
      @mousedown="onStageMouseDown"
      @mouseup="onStageMouseUp"
      @dragstart.prevent
    >
      <!-- Desktop Left Chevron -->
      <button
        type="button"
        aria-label="Previous slide"
        class="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white border border-neutral-300 text-neutral-700 hover:border-[#0072BC] hover:text-[#0072BC] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
        @mousedown.stop
        @click.stop="scrollToIndex(activeIndex - 1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <article
        v-for="(slide, idx) in slides"
        :key="slide.id"
        class="absolute w-[420px] max-w-[44vw] rounded-[28px] border border-neutral-200 hover:border-[#0072BC] bg-white p-6 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="
          activeIndex === idx
            ? 'shadow-[0_20px_50px_rgba(0,10,49,0.14)] cursor-default'
            : 'shadow-[0_10px_28px_rgba(0,10,49,0.08)] cursor-pointer hover:opacity-95'
        "
        :style="getDesktopCardStyle(idx)"
        @click="activeIndex !== idx && scrollToIndex(idx)"
      >
        <div>
          <h3 class="text-xl font-medium text-neutral-800 mb-4">
            {{ slide.title }}
          </h3>

          <div class="overflow-hidden rounded-2xl mb-5 aspect-[4/3] bg-neutral-100">
            <img
              :src="slide.image"
              :alt="slide.imageAlt"
              draggable="false"
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
          @click.stop
        >
          {{ slide.ctaLabel }}
        </a>
      </article>

      <!-- Desktop Right Chevron -->
      <button
        type="button"
        aria-label="Next slide"
        class="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        @mousedown.stop
        @click.stop="scrollToIndex(activeIndex + 1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Centered Circular Arrows (Mobile Only) -->
    <div
      class="items-center justify-center gap-4 mt-4"
      :class="activeDevice === 'mobile' ? 'flex' : 'flex md:hidden'"
    >
      <button
        type="button"
        aria-label="Previous slide"
        class="w-11 h-11 rounded-full border border-neutral-400 text-neutral-700 hover:border-[#0072BC] hover:text-[#0072BC] flex items-center justify-center transition-colors cursor-pointer"
        @click="scrollToIndex(activeIndex - 1)"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next slide"
        class="w-11 h-11 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        @click="scrollToIndex(activeIndex + 1)"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>
