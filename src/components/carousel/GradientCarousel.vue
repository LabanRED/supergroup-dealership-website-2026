<script setup>
import { ref } from 'vue'

const pillars = [
  {
    id: 'inbox',
    title: 'Unified Inbox',
    description:
      'Consolidate Facebook, Instagram, WhatsApp, and Google Business messages into one dealership queue with instant branch routing.',
    metric: '3x faster first response',
  },
  {
    id: 'posting',
    title: 'OEM-Compliant Posting',
    description:
      'Distribute national campaigns across hundreds of dealer pages while giving local managers one-click approval and localized pricing.',
    metric: '100% brand consistency',
  },
  {
    id: 'frames',
    title: 'Dynamic Brand Frames',
    description:
      'Apply approved OEM overlays, showroom badges, and finance callouts automatically to every vehicle upload.',
    metric: 'Zero manual design lag',
  },
  {
    id: 'ai',
    title: 'LiveChat AI',
    description:
      'Engage after-hours shoppers with an automotive-trained AI assistant that answers stock questions and books test drives.',
    metric: '24/7 lead capture',
  },
]

const activeIndex = ref(0)

function next() {
  activeIndex.value = (activeIndex.value + 1) % pillars.length
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + pillars.length) % pillars.length
}
</script>

<template>
  <section class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-6">
    <div
      class="rounded-[32px] p-8 md:p-14 text-white bg-gradient-to-br from-[#00A5C5] via-[#2C8799] to-neutral-950 shadow-xl"
    >
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span class="text-xs font-semibold uppercase tracking-widest text-white/80">
            Core Pillars
          </span>
          <h2 class="!text-white mt-2">
            Built for high-velocity automotive teams
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous pillar"
            class="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            @click="prev"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next pillar"
            class="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            @click="next"
          >
            →
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="(pillar, idx) in pillars"
          :key="pillar.id"
          type="button"
          class="text-left rounded-2xl p-6 transition-all border cursor-pointer"
          :class="
            activeIndex === idx
              ? 'bg-white text-black border-white shadow-lg'
              : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
          "
          @click="activeIndex = idx"
        >
          <div class="mb-4">
            <slot name="icon" :pillar="pillar" :active="activeIndex === idx">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm"
                :class="activeIndex === idx ? 'bg-[#00A5C5] text-white' : 'bg-white/15 text-white'"
              >
                0{{ idx + 1 }}
              </div>
            </slot>
          </div>

          <h3 class="text-lg font-medium mb-2">{{ pillar.title }}</h3>
          <p
            class="text-sm mb-4"
            :style="{ color: activeIndex === idx ? '#404040' : '#e5e5e5' }"
          >
            {{ pillar.description }}
          </p>
          <div
            class="text-xs font-semibold uppercase tracking-wider"
            :class="activeIndex === idx ? 'text-[#00A5C5]' : 'text-white/80'"
          >
            {{ pillar.metric }}
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
