<script setup>
import { ref } from 'vue'

const faqs = [
  {
    q: 'How quickly can PostX onboard a multi-rooftop dealer group?',
    a: 'Most dealer groups connect their Facebook, Instagram, and Google Business Profiles in under 48 hours using our guided OAuth onboarding.',
  },
  {
    q: 'Can OEM marketing teams enforce brand guidelines across local dealers?',
    a: 'Yes. Brand Frames and locked campaign templates ensure every rooftop stays 100% OEM-compliant while still allowing localized pricing and contact details.',
  },
  {
    q: 'How does LiveChat AI handle after-hours dealership inquiries?',
    a: 'LiveChat AI answers vehicle availability, service hours, and finance questions 24/7, then routes qualified test-drive bookings straight to your CRM or showroom team.',
  },
  {
    q: 'Do we own our data and customer conversations?',
    a: 'Completely. PostX is a proprietary platform built so your dealer group retains full ownership of its social assets, customer threads, and analytics history.',
  },
]

const openIndex = ref(0)

function toggle(idx) {
  openIndex.value = openIndex.value === idx ? -1 : idx
}
</script>

<template>
  <section id="faq" class="mx-auto max-w-[1000px] px-[20px] md:px-10 py-10">
    <div class="text-center mb-10">
      <span class="text-xs font-semibold uppercase tracking-widest text-[#00A5C5]">FAQ</span>
      <h2 class="mt-2">
        Frequently asked questions
      </h2>
    </div>

    <div class="space-y-3">
      <div
        v-for="(item, idx) in faqs"
        :key="item.q"
        class="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-colors"
        :class="{ 'border-[#00A5C5]': openIndex === idx }"
      >
        <button
          type="button"
          class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-medium text-neutral-900 cursor-pointer"
          @click="toggle(idx)"
        >
          <span class="text-base md:text-lg font-medium">{{ item.q }}</span>
          <span
            class="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-sm shrink-0 transition-transform duration-200"
            :class="{ 'rotate-45 bg-[#00A5C5] text-white': openIndex === idx }"
          >
            +
          </span>
        </button>

        <div v-show="openIndex === idx" class="px-6 pb-5">
          <p class="text-sm text-neutral-600">{{ item.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
