<script setup>
import mileageIcon from '../../images/vdp-mileage-icon.svg'
import paintIcon from '../../images/vdp-paint-icon.svg'
import bodyTypeIcon from '../../images/vdp-body-type-icon.svg'
import transmissionIcon from '../../images/vdp-transmission-icon.svg'
import engineSizeIcon from '../../images/vdp-engine-size-icon.svg'
import fuelTypeIcon from '../../images/vdp-fuel-type-icon.svg'

const props = defineProps({
  mileage: {
    type: String,
    default: '43 987 Km',
  },
  exteriorColour: {
    type: String,
    default: 'White',
  },
  bodyType: {
    type: String,
    default: 'Hatch',
  },
  transmission: {
    type: String,
    default: 'Manual',
  },
  engineSize: {
    type: String,
    default: '999 Cc',
  },
  fuelType: {
    type: String,
    default: 'Petrol',
  },
})

const items = [
  { label: 'Mileage', value: props.mileage, icon: mileageIcon },
  { label: 'Exterior Colour', value: props.exteriorColour, icon: paintIcon },
  { label: 'Body Type', value: props.bodyType, icon: bodyTypeIcon },
  { label: 'Transmission', value: props.transmission, icon: transmissionIcon },
  { label: 'Engine Size', value: props.engineSize, icon: engineSizeIcon },
  { label: 'Fuel Type', value: props.fuelType, icon: fuelTypeIcon },
]
</script>

<template>
  <section class="!my-0 pt-4 space-y-4">
    <h2>Overview</h2>

    <div class="grid grid-cols-2 gap-x-6 gap-y-5">
      <div
        v-for="item in items"
        :key="item.label"
        class="flex items-center gap-3"
      >
        <img :src="item.icon" alt="" class="w-7 h-7 shrink-0" />
        <div class="min-w-0">
          <div class="text-xs text-neutral-500">{{ item.label }}</div>
          <div class="text-sm font-medium text-neutral-900">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
