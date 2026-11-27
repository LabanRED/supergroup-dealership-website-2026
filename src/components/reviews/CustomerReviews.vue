<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import { createDragScrollHandler } from '../../composables/useDragScroll.js'
import starIcon from '../../images/star-icon.svg'
import googleLogo from '../../images/google-reivew-logo.webp'
import profileImage from '../../images/customer-review-profile-image.webp'
import profileImage2 from '../../images/customer-review-profile-image-2.jpg'
import profileImage3 from '../../images/customer-review-profile-image-3.jpg'
import profileImage4 from '../../images/customer-review-profile-image-4.jpg'
import profileImage5 from '../../images/customer-review-profile-image-5.jpg'
import profileImage6 from '../../images/customer-review-profile-image-6.jpg'
import profileImage7 from '../../images/customer-review-profile-image-7.jpg'
import profileImage8 from '../../images/customer-review-profile-image-8.jpg'
import profileImage9 from '../../images/customer-review-profile-image-9.jpg'

const { activeDevice } = useDevicePreview()

const reviews = [
  {
    id: 1,
    name: 'Steven Human',
    timeAgo: '1 year ago on',
    avatar: profileImage,
    text: "Outstanding service from Omphemetse! Extremely knowledgeable, friendly, and efficient. The process was quick, and I didn't have to wait long. Highly recommend for anyone looking for a vehicle and top-notch service. Great experience!",
  },
  {
    id: 2,
    name: 'Thabo Mokoena',
    timeAgo: '8 months ago on',
    avatar: profileImage2,
    text: 'Seamless handover from start to finish. The dealership team kept me updated throughout financing and had my vehicle spotless and ready on collection day.',
  },
  {
    id: 3,
    name: 'Annelize van der Merwe',
    timeAgo: '4 months ago on',
    avatar: profileImage3,
    text: 'Booked my annual service online and the service bay team was punctual, transparent on pricing, and had me back on the road ahead of schedule.',
  },
  {
    id: 4,
    name: 'Palesa M.',
    timeAgo: '3 months ago on',
    avatar: profileImage4,
    text: 'Best service ever at Arnold Chatz Cars. Thank you very much Vincent and the whole team for making my dream come true. You guys are the best!',
  },
  {
    id: 5,
    name: 'George M.',
    timeAgo: '5 months ago on',
    avatar: profileImage5,
    text: 'Super great service — highly recommended! Friendly, welcoming atmosphere from the moment I walked into Arnold Chatz Cars, and the handover was effortless.',
  },
  {
    id: 6,
    name: 'Vanessa N.',
    timeAgo: '6 months ago on',
    avatar: profileImage6,
    text: 'Great customer service! Warm, welcoming experience and fantastic assistance from Thlompho right through to collecting my vehicle.',
  },
  {
    id: 7,
    name: 'Kagiso D.',
    timeAgo: '2 months ago on',
    avatar: profileImage7,
    text: 'Fast, efficient, and completely transparent communication from Ashraf and the Suzuki Edenvale team. The trade-in and finance process was smooth and hassle-free.',
  },
  {
    id: 8,
    name: 'Pieter V.',
    timeAgo: '7 months ago on',
    avatar: profileImage8,
    text: 'Excellent service from start to finish at Lionel Motors Rustenburg. The team was exceptional, helpful, and concise — kept me informed every step of the way.',
  },
  {
    id: 9,
    name: 'Naledi K.',
    timeAgo: '1 month ago on',
    avatar: profileImage9,
    text: 'Phenomenal and helpful service during my vehicle purchase at GWM Haval Benoni. Clean showroom, smooth test drive, and a memorable handover day!',
  },
]

const trackRef = ref(null)
const activeIndex = ref(0)
const isPaused = ref(false)
const handleTrackMouseDown = createDragScrollHandler({ snapToSlide: true })
let isProgrammaticScroll = false
let scrollTimeout = null
let autoScrollTimer = null

function getMaxIndex() {
  if (typeof window === 'undefined') return reviews.length - 1
  const isDesktopGrid = activeDevice.value !== 'mobile' && window.innerWidth >= 768
  return isDesktopGrid ? Math.max(0, reviews.length - 3) : reviews.length - 1
}

function scrollToIndex(index) {
  const track = trackRef.value
  if (!track) return

  const clamped = Math.max(0, Math.min(index, reviews.length - 1))
  activeIndex.value = clamped
  isProgrammaticScroll = true

  const padLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0
  const targetLeft =
    clamped === 0
      ? 0
      : Math.max(0, (track.children[clamped]?.offsetLeft ?? 0) - padLeft)

  track.scrollTo({
    left: targetLeft,
    behavior: 'smooth',
  })

  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll = false
  }, 450)
}

function stepReview(direction) {
  const maxIdx = getMaxIndex()
  if (direction > 0) {
    scrollToIndex(activeIndex.value >= maxIdx ? 0 : activeIndex.value + 1)
  } else {
    scrollToIndex(activeIndex.value <= 0 ? maxIdx : activeIndex.value - 1)
  }
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

function startAutoScroll() {
  stopAutoScroll()
  autoScrollTimer = window.setInterval(() => {
    if (isPaused.value) return
    const maxIdx = getMaxIndex()
    const nextIdx = activeIndex.value >= maxIdx ? 0 : activeIndex.value + 1
    scrollToIndex(nextIdx)
  }, 4000)
}

function stopAutoScroll() {
  if (autoScrollTimer) {
    window.clearInterval(autoScrollTimer)
    autoScrollTimer = null
  }
}

onMounted(() => {
  startAutoScroll()
})

onUnmounted(() => {
  stopAutoScroll()
  clearTimeout(scrollTimeout)
})
</script>

<template>
  <section class="mx-auto max-w-[1600px] px-[10px] md:px-10 py-6 md:pt-[50px]">
    <!-- Mobile Heading -->
    <div
      class="mb-6"
      :class="activeDevice === 'mobile' ? 'block' : 'block md:hidden'"
    >
      <h2 class="mb-3">
        What Our Clients<br />Say About Us
      </h2>
      <p class="text-neutral-600" style="color: #525252;">
        Real stories from real handover days and service bays across our dealerships.
      </p>
    </div>

    <!-- Desktop Heading -->
    <div
      class="text-center md:mb-[50px]"
      :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:block'"
    >
      <h2
        class="font-poppins"
        style="font-size: 48px; line-height: 64px;"
      >
        <span class="block font-normal text-[#A7A9AC]">What Our Clients</span>
        <span class="block font-medium text-[#0072BC]">Say About Us</span>
      </h2>
      <p class="text-neutral-600 mt-4" style="color: #525252;">
        Real stories from real handover days and service bays across our dealerships.
      </p>
    </div>

    <!-- Scrollable Review Track with Desktop Side Chevrons -->
    <div
      :class="activeDevice === 'mobile' ? '' : 'md:flex md:items-center md:gap-4'"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <!-- Desktop Left Chevron -->
      <button
        type="button"
        aria-label="Previous review"
        class="shrink-0 w-11 h-11 rounded-full bg-white border border-neutral-300 text-neutral-700 hover:border-[#0072BC] hover:text-[#0072BC] shadow-sm items-center justify-center transition-colors cursor-pointer"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:flex'"
        @click="stepReview(-1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref="trackRef"
        class="relative flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-1.5 px-1.5 pt-2 pb-5 mx-auto cursor-grab active:cursor-grabbing select-none"
        :class="activeDevice === 'mobile' ? 'max-w-md' : 'max-w-md md:max-w-none md:flex-1 md:min-w-0'"
        style="scrollbar-width: none;"
        @scroll="handleScroll"
        @mousedown="isPaused = true; handleTrackMouseDown($event)"
        @mouseup="isPaused = false"
        @touchstart.passive="isPaused = true"
        @touchend.passive="isPaused = false"
        @dragstart.prevent
      >
        <article
          v-for="review in reviews"
          :key="review.id"
          class="snap-start shrink-0 rounded-[28px] bg-white border border-neutral-200/80 hover:border-[#0072BC] transition-colors p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between"
          :class="
            activeDevice === 'mobile'
              ? 'w-full'
              : 'w-full md:w-[calc((100%-32px)/3)]'
          "
        >
          <div>
            <!-- 5 Stars -->
            <div class="flex items-center gap-1.5 mb-3">
              <img
                v-for="n in 5"
                :key="n"
                :src="starIcon"
                alt="Star"
                draggable="false"
                class="w-5 h-5"
              />
            </div>

            <!-- Google Badge + Date -->
            <div class="flex items-center gap-2 mb-4">
              <img :src="googleLogo" alt="Google" draggable="false" class="h-4 w-auto" />
              <span class="text-xs text-neutral-400">
                {{ review.timeAgo }}
              </span>
            </div>

            <!-- Reviewer Profile -->
            <div class="flex items-center gap-3 mb-4">
              <img
                :src="review.avatar"
                :alt="review.name"
                draggable="false"
                class="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <span class="font-medium text-base text-neutral-900">
                {{ review.name }}
              </span>
            </div>

            <!-- Review Text -->
            <p class="text-sm text-neutral-800 leading-relaxed">
              {{ review.text }}
            </p>
          </div>
        </article>
      </div>

      <!-- Desktop Right Chevron -->
      <button
        type="button"
        aria-label="Next review"
        class="shrink-0 w-11 h-11 rounded-full items-center justify-center text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:flex'"
        @click="stepReview(1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Pagination Dots -->
    <div class="flex items-center justify-center gap-2.5 mt-2">
      <button
        v-for="(review, idx) in reviews"
        :key="review.id"
        type="button"
        :aria-label="`Show review ${idx + 1}`"
        class="w-2.5 h-2.5 rounded-full transition-colors cursor-pointer"
        :class="activeIndex === idx ? 'bg-[#0072BC]' : 'bg-neutral-300 hover:bg-neutral-400'"
        @click="scrollToIndex(idx)"
      ></button>
    </div>
  </section>
</template>
