<script setup>
import { ref } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
})

const current = ref(0)

function next() {
  if (!props.slides.length) return
  current.value = (current.value + 1) % props.slides.length
}

function prev() {
  if (!props.slides.length) return
  current.value = (current.value - 1 + props.slides.length) % props.slides.length
}
</script>

<template>
  <div v-if="slides.length" class="rounded-[32px] border border-neutral-200 bg-neutral-50 p-6 md:p-10">
    <div class="flex items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-2">
        <span
          v-for="(slide, idx) in slides"
          :key="slide.id || idx"
          class="h-2 rounded-full transition-all cursor-pointer"
          :class="current === idx ? 'w-8 bg-[#00A5C5]' : 'w-2 bg-neutral-300'"
          @click="current = idx"
        ></span>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn btn-primary-outline !px-3.5 !py-2"
          aria-label="Previous slide"
          @click="prev"
        >
          ←
        </button>
        <button
          type="button"
          class="btn btn-primary !px-3.5 !py-2"
          aria-label="Next slide"
          @click="next"
        >
          →
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-7 space-y-4">
        <span class="inline-block text-xs font-semibold uppercase tracking-wider text-[#00A5C5]">
          {{ slides[current].eyebrow }}
        </span>
        <h3 class="text-2xl md:text-3xl font-medium text-neutral-900">
          {{ slides[current].title }}
        </h3>
        <p class="text-neutral-600">
          {{ slides[current].description }}
        </p>
      </div>

      <div class="lg:col-span-5">
        <div class="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm space-y-3">
          <div class="text-xs font-medium text-neutral-400 uppercase tracking-wider">
            Automated Step {{ current + 1 }} of {{ slides.length }}
          </div>
          <div class="text-lg font-semibold text-neutral-900">
            {{ slides[current].highlight }}
          </div>
          <div class="text-sm text-neutral-600">
            {{ slides[current].outcome }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
