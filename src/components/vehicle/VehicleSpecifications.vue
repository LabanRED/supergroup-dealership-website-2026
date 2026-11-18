<script setup>
import { ref } from 'vue'

const sections = [
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
    id: 'measurements',
    title: 'Measurements',
    specs: [
      { label: 'Doors', value: '5' },
      { label: 'Seats', value: '5' },
      { label: 'Fuel Tank Capacity', value: '42 L' },
      { label: 'Boot Capacity', value: '391 L' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    specs: [
      { label: '0–100 km/h', value: '12.2 s' },
      { label: 'Top Speed', value: '180 km/h' },
      { label: 'Fuel Consumption', value: '5.7 L/100 km' },
    ],
  },
  {
    id: 'drivetrain',
    title: 'Drivetrain',
    specs: [
      { label: 'Drive Type', value: 'Front-Wheel Drive' },
      { label: 'Gearbox', value: '5-Speed Manual' },
    ],
  },
  {
    id: 'power',
    title: 'Power',
    specs: [
      { label: 'Engine Size', value: '999 cc (1.0T)' },
      { label: 'Cylinders', value: '3-Cylinder Turbo' },
      { label: 'Max Power', value: '66 kW @ 5,000 rpm' },
      { label: 'Max Torque', value: '160 Nm' },
    ],
  },
  {
    id: 'styling',
    title: 'Styling',
    specs: [
      { label: 'Headlights', value: 'LED' },
      { label: 'Daytime Running Lights', value: 'LED' },
      { label: 'Side Mirrors', value: 'Body-Coloured' },
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
        class="border border-neutral-200 bg-white overflow-hidden transition-all"
        :class="openId === section.id ? 'rounded-3xl' : 'rounded-full'"
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
            class="flex items-center justify-between text-xs py-1"
          >
            <span class="text-neutral-500">{{ spec.label }}</span>
            <span class="font-medium text-neutral-900">{{ spec.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
