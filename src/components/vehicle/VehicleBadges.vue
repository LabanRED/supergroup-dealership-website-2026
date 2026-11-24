<script setup>
defineProps({
  condition: {
    type: String,
    default: '',
  },
  fuelType: {
    type: String,
    default: '',
  },
  inline: {
    type: Boolean,
    default: false,
  },
})

const conditionClasses = {
  New: 'bg-[#0072BC] text-white',
  Demo: 'bg-white text-[#0072BC] border border-neutral-200',
  Used: 'bg-[#00436E] text-white',
}

const fuelClasses = {
  Hybrid: 'bg-[#348E38] text-white',
  Electric: 'bg-[#0072BC] text-white',
}
</script>

<template>
  <div
    :class="
      inline
        ? 'inline-flex items-center gap-1.5 flex-wrap'
        : 'absolute top-3 left-3 flex flex-col items-start gap-1.5 pointer-events-none'
    "
  >
    <span
      v-if="condition"
      class="rounded-full font-medium shadow-sm"
      :class="[
        inline ? 'px-2.5 py-0.5 text-[11px] leading-tight' : 'px-3.5 py-1 text-xs',
        conditionClasses[condition] || 'bg-[#0072BC] text-white',
      ]"
    >
      {{ condition }}
    </span>

    <span
      v-if="fuelType === 'Hybrid' || fuelType === 'Electric'"
      class="rounded-full font-medium shadow-sm"
      :class="[
        inline ? 'px-2.5 py-0.5 text-[11px] leading-tight' : 'px-3.5 py-1 text-xs',
        fuelClasses[fuelType],
      ]"
    >
      {{ fuelType }}
    </span>
  </div>
</template>
