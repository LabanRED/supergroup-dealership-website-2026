<script setup>
const services = [
  {
    title: 'Unified Inbox',
    href: '#unified-inbox',
    description: 'Every social DM, comment, and WhatsApp inquiry in one routed queue.',
  },
  {
    title: 'Posting',
    href: '#posting',
    description: 'Schedule and localize OEM campaigns across every dealership rooftop.',
  },
  {
    title: 'Frames',
    href: '#frames',
    description: 'Apply compliant brand overlays and pricing badges automatically.',
  },
  {
    title: 'Reviews',
    href: '#reviews',
    description: 'Monitor ratings and respond to Google & Facebook reviews in seconds.',
  },
  {
    title: 'LiveChat AI',
    href: '#livechat-ai',
    description: '24/7 automotive conversational AI that qualifies leads and books drives.',
  },
]
</script>

<template>
  <section class="mx-auto max-w-[1400px] px-[10px] md:px-10 py-8">
    <div class="mb-8">
      <span class="text-xs font-semibold uppercase tracking-widest text-[#00A5C5]">
        Platform Modules
      </span>
      <h2 class="mt-2">
        Every tool your dealer network needs
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <a
        v-for="service in services"
        :key="service.href"
        :href="service.href"
        class="group rounded-3xl border border-neutral-200 bg-white p-6 hover:border-[#00A5C5] hover:shadow-lg transition-all flex flex-col justify-between"
      >
        <div>
          <div
            class="w-10 h-10 rounded-xl bg-[#00A5C5]/10 text-[#00A5C5] flex items-center justify-center mb-4 group-hover:bg-[#00A5C5] group-hover:text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">{{ service.title }}</h3>
          <p class="text-sm text-neutral-600">{{ service.description }}</p>
        </div>

        <span class="mt-6 inline-flex items-center text-xs font-semibold text-[#00A5C5]">
          Explore â†’
        </span>
      </a>
    </div>
  </section>
</template>
