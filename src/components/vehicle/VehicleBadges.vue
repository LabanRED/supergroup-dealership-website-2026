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
})

const conditionClasses = {
  New: 'bg-[#0072BC] text-white',
  Demo: 'bg-white text-[#0072BC]',
  Used: 'bg-[#00436E] text-white',
}

const fuelClasses = {
  Hybrid: 'bg-[#348E38] text-white',
  Electric: 'bg-[#0072BC] text-white',
}
</script>

<template>
  <div class="absolute top-3 left-3 flex flex-col items-start gap-1.5 pointer-events-none">
    <span
      v-if="condition"
      class="px-3.5 py-1 rounded-full text-xs font-medium shadow-sm"
      :class="conditionClasses[condition] || 'bg-[#0072BC] text-white'"
    >
      {{ condition }}
    </span>

    <span
      v-if="fuelType === 'Hybrid' || fuelType === 'Electric'"
      class="px-3.5 py-1 rounded-full text-xs font-medium shadow-sm"
      :class="fuelClasses[fuelType]"
    >
      {{ fuelType }}
    </span>
  </div>
</template>
