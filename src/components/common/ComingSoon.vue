<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: 'We are putting the finishing touches on this capability. Check back soon or return to the main overview.',
  },
  badge: {
    type: String,
    default: 'Coming Soon',
  },
})
</script>

<template>
  <section class="mx-auto max-w-[1200px] px-[20px] md:px-10 py-20 md:py-32 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A5C5]/10 text-[#00A5C5] text-xs font-semibold uppercase tracking-wider mb-6">
      <span class="w-2 h-2 rounded-full bg-[#00A5C5]"></span>
      {{ badge }}
    </div>

    <h1 class="text-neutral-900 mb-6">{{ title }}</h1>

    <p class="max-w-2xl mx-auto text-neutral-600 mb-10">
      {{ subtitle }}
    </p>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <a href="#" class="btn btn-primary">Back to Home</a>
      <a href="#contact" class="btn btn-primary-outline">Request Early Access</a>
    </div>
  </section>
</template>
