<script setup>
import { ref } from 'vue'

const items = [
  {
    title: 'Instant Mobile Approvals',
    description: 'Review and approve scheduled dealership campaigns directly from your phone.',
    badge: 'iOS & Android',
  },
  {
    title: 'AI Reply Suggestions',
    description: 'Draft on-brand responses to customer DMs and comments in one tap.',
    badge: 'AI Assistant',
  },
  {
    title: 'Live Lead Alerts',
    description: 'Push notifications the moment a high-intent buyer requests a test drive or trade-in valuation.',
    badge: 'Real-Time',
  },
  {
    title: 'Branch Health Score',
    description: 'Monitor response times and review ratings across every rooftop on the go.',
    badge: 'Telemetry',
  },
]

const selected = ref(0)
</script>

<template>
  <section class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <button
        v-for="(item, idx) in items"
        :key="item.title"
        type="button"
        class="text-left rounded-3xl p-6 border transition-all cursor-pointer"
        :class="
          selected === idx
            ? 'bg-black text-white border-black shadow-xl'
            : 'bg-white text-neutral-900 border-neutral-200 hover:border-[#00A5C5]'
        "
        @click="selected = idx"
      >
        <div class="flex items-center justify-between mb-5">
          <div
            class="w-11 h-11 rounded-2xl flex items-center justify-center"
            :class="selected === idx ? 'bg-[#00A5C5] text-white' : 'bg-[#00A5C5]/10 text-[#00A5C5]'"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span
            class="text-[11px] font-medium px-2.5 py-1 rounded-full"
            :class="selected === idx ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-600'"
          >
            {{ item.badge }}
          </span>
        </div>

        <h3 class="text-lg font-medium mb-2">{{ item.title }}</h3>
        <p
          class="text-sm"
          :style="{ color: selected === idx ? '#d4d4d4' : '#525252' }"
        >
          {{ item.description }}
        </p>
      </button>
    </div>
  </section>
</template>
