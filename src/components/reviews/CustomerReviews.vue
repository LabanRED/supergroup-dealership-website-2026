<script setup>
import { ref } from 'vue'
import starIcon from '../../images/star-icon.svg'
import googleLogo from '../../images/google-reivew-logo.webp'
import profileImage from '../../images/customer-review-profile-image.webp'
import profileImage2 from '../../images/customer-review-profile-image-2.jpg'
import profileImage3 from '../../images/customer-review-profile-image-3.jpg'

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
  <section class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-6">
    <div class="mb-6">
      <h2 class="mb-3">
        What Our Clients<br />Say About Us
      </h2>
      <p class="text-neutral-600" style="color: #525252;">
        Real stories from real handover days and service bays across our dealerships.
      </p>
    </div>

    <!-- Scrollable Review Track (1 card at a time) -->
    <div
      ref="trackRef"
      class="relative flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 max-w-md mx-auto"
      style="scrollbar-width: none;"
      @scroll="handleScroll"
    >
      <article
        v-for="review in reviews"
        :key="review.id"
        class="snap-start shrink-0 w-full rounded-[28px] bg-white border border-neutral-100 p-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] flex flex-col justify-between"
      >
        <div>
          <!-- 5 Stars -->
          <div class="flex items-center gap-1.5 mb-3">
            <img
              v-for="n in 5"
              :key="n"
              :src="starIcon"
              alt="Star"
              class="w-5 h-5"
            />
          </div>

          <!-- Google Badge + Date -->
          <div class="flex items-center gap-2 mb-4">
            <img :src="googleLogo" alt="Google" class="h-4 w-auto" />
            <span class="text-xs text-neutral-400">
              {{ review.timeAgo }}
            </span>
          </div>

          <!-- Reviewer Profile -->
          <div class="flex items-center gap-3 mb-4">
            <img
              :src="review.avatar"
              :alt="review.name"
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
