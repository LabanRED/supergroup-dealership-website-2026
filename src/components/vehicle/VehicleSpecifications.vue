<script setup>
import { ref } from 'vue'

defineProps({
  fuelType: {
    type: String,
    default: 'Petrol',
  },
})

const sections = [
  {
    id: 'general',
    title: 'General',
    specs: [
      { label: 'Body Type', value: 'Hatchback' },
      { label: 'Doors', value: '5' },
      { label: 'Seats', value: '5' },
      { label: 'Boot Capacity', value: '391 L' },
      { label: 'Fuel Tank Capacity', value: '42 L' },
    ],
  },
  {
    id: 'engine',
    title: 'Engine',
    specs: [
      { label: 'Engine Size', value: '999 cc (1.0T)' },
      { label: 'Cylinders', value: '3-Cylinder Turbo' },
      { label: 'Fuel Type', value: 'Petrol' },
      { label: 'Max Power', value: '66 kW @ 5,000 rpm' },
      { label: 'Max Torque', value: '160 Nm' },
      { label: 'Fuel Consumption', value: '5.7 L/100 km' },
    ],
  },
  {
    id: 'handling',
    title: 'Handling',
    specs: [
      { label: 'Drive Type', value: 'Front-Wheel Drive' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Power Steering', value: 'Electric' },
      { label: '0–100 km/h', value: '12.2 s' },
      { label: 'Top Speed', value: '180 km/h' },
    ],
  },
  {
    id: 'comfort',
    title: 'Comfort',
    specs: [
      { label: 'Air Conditioning', value: 'Manual' },
      { label: 'Electric Windows', value: 'Front & Rear' },
      { label: 'Steering Wheel', value: 'Multi-Function' },
      { label: 'Cruise Control', value: 'Standard' },
    ],
  },
  {
    id: 'technology',
    title: 'Technology',
    specs: [
      { label: 'Infotainment', value: 'Touchscreen Display' },
      { label: 'Connectivity', value: 'Bluetooth / USB' },
      { label: 'Smartphone Integration', value: 'Apple CarPlay & Android Auto' },
    ],
  },
  {
    id: 'safety',
    title: 'Safety',
    specs: [
      { label: 'Airbags', value: '6 Airbags' },
      { label: 'ABS Braking', value: 'Standard with EBD' },
      { label: 'Stability Control', value: 'ESC' },
      { label: 'ISOFIX Child Seat Anchors', value: 'Standard' },
    ],
  },
]

const openId = ref(null)

function toggle(id) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section class="!my-0 pt-[30px] pb-6 space-y-4">
    <h2>Additional Specifications</h2>

    <div class="space-y-3">
      <div
        v-for="section in sections"
        :key="section.id"
        class="rounded-[28px] border border-neutral-200 bg-white overflow-hidden"
      >
        <button
          type="button"
          class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
          @click="toggle(section.id)"
        >
          <span class="text-sm font-medium text-[#004A87]">{{ section.title }}</span>
          <svg
            class="w-4 h-4 text-neutral-600 transition-transform duration-200 shrink-0"
            :class="{ 'rotate-180': openId === section.id }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div v-if="openId === section.id" class="px-6 pb-4 pt-1 border-t border-neutral-100 space-y-2">
          <div
            v-for="spec in section.specs"
            :key="spec.label"
            class="flex items-start justify-between gap-4 text-xs py-1"
          >
            <span class="text-neutral-500 text-left">{{ spec.label }}</span>
            <span class="font-medium text-neutral-900 text-right">{{ spec.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Specs Note -->
    <div class="pt-3 space-y-3 text-xs leading-relaxed text-neutral-600">
      <div>
        <div class="font-semibold text-[#004A87] mb-1">Please note:</div>
        <p>
          The data displayed above are manufacturer specs for New vehicles and do not reflect the current condition of a used vehicle which may differ from the one being offered for sale. We recommend that you always check the details with the seller prior to purchase.
        </p>
      </div>
      <p v-if="fuelType === 'Electric'">
        ** Real world range and energy consumption averages may vary according to factors such as driving styles, environmental conditions, load, wheel and tyre fitment, accessories and options fitted.
      </p>
      <p v-else>
        ** Real world fuel consumption averages may vary according to factors such as driving styles, environmental conditions, load, wheel and tyre fitment, accessories and options fitted.
      </p>
    </div>
  </section>
</template>
