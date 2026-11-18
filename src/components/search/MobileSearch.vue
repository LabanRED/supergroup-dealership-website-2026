<script setup>
import { ref, computed, watch } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import filterIcon from '../../images/filter-icon.svg'
import searchIcon from '../../images/search-icon.svg'

const { activeDevice } = useDevicePreview()

const emit = defineEmits(['search'])

const query = ref('')
const filtersOpen = ref(false)

const selectedMake = ref('')
const selectedModel = ref('')
const selectedCondition = ref('')
const selectedTransmission = ref('')
const selectedFuel = ref('')
const selectedMaxMileage = ref('')
const selectedMinPrice = ref('')
const selectedMaxPrice = ref('')

const modelsByMake = {
  Toyota: ['Corolla Cross', 'Hilux', 'Fortuner', 'Starlet', 'RAV4'],
  Volkswagen: ['Polo', 'Polo Vivo', 'Golf', 'T-Cross', 'Tiguan'],
  Ford: ['Ranger', 'Everest', 'Puma', 'Territory'],
  Hyundai: ['Grand i10', 'Venue', 'Creta', 'Tucson'],
  BMW: ['1 Series', '3 Series', 'X1', 'X3'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'GLA', 'GLC'],
  Chery: ['Tiggo 4 Pro', 'Tiggo 7 Pro Max', 'Tiggo 8 Pro'],
}

const makes = Object.keys(modelsByMake)
const availableModels = computed(() => (selectedMake.value ? modelsByMake[selectedMake.value] || [] : []))

watch(selectedMake, () => {
  selectedModel.value = ''
})

const conditions = ['New', 'Demo', 'Used']
const transmissions = ['Automatic', 'Manual']
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
const mileageOptions = [
  { label: '10,000 km', value: 10000 },
  { label: '25,000 km', value: 25000 },
  { label: '50,000 km', value: 50000 },
  { label: '100,000 km', value: 100000 },
  { label: '150,000 km', value: 150000 },
]
const minPriceOptions = [
  { label: 'R 150,000', value: 150000 },
  { label: 'R 250,000', value: 250000 },
  { label: 'R 350,000', value: 350000 },
  { label: 'R 500,000', value: 500000 },
  { label: 'R 750,000', value: 750000 },
]
const maxPriceOptions = [
  { label: 'R 300,000', value: 300000 },
  { label: 'R 450,000', value: 450000 },
  { label: 'R 600,000', value: 600000 },
  { label: 'R 850,000', value: 850000 },
  { label: 'R 1,200,000+', value: 1200000 },
]

const activeFilterCount = computed(() => {
  return [
    selectedMake.value,
    selectedModel.value,
    selectedCondition.value,
    selectedTransmission.value,
    selectedFuel.value,
    selectedMaxMileage.value,
    selectedMinPrice.value,
    selectedMaxPrice.value,
  ].filter(Boolean).length
})

function resetFilters() {
  selectedMake.value = ''
  selectedModel.value = ''
  selectedCondition.value = ''
  selectedTransmission.value = ''
  selectedFuel.value = ''
  selectedMaxMileage.value = ''
  selectedMinPrice.value = ''
  selectedMaxPrice.value = ''
}

function submitSearch() {
  emit('search', {
    query: query.value.trim(),
    make: selectedMake.value,
    model: selectedModel.value,
    condition: selectedCondition.value,
    transmission: selectedTransmission.value,
    fuelType: selectedFuel.value,
    maxMileage: selectedMaxMileage.value,
    minPrice: selectedMinPrice.value,
    maxPrice: selectedMaxPrice.value,
  })
  window.location.hash = '#showroom'
}
</script>

<template>
  <section
    class="!-mt-24 !mb-6 relative z-20 mx-auto max-w-[1400px] px-[20px]"
    :class="activeDevice === 'mobile' ? 'block' : 'block md:hidden'"
  >
    <div
      class="rounded-[28px] bg-white p-5 shadow-[0_12px_36px_rgba(0,10,49,0.12)]"
    >
      <form class="space-y-4" @submit.prevent="submitSearch">
        <!-- Search Pill -->
        <div
          class="flex items-center gap-2 rounded-full bg-[#EAEAEA] pl-5 pr-1.5 py-1.5"
        >
          <input
            v-model="query"
            type="search"
            placeholder="Type to start searching..."
            aria-label="Search vehicles"
            class="flex-1 min-w-0 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
          />

          <!-- Filter Toggle Button -->
          <button
            type="button"
            class="relative p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle search filters"
            :aria-expanded="filtersOpen"
            @click="filtersOpen = !filtersOpen"
          >
            <img :src="filterIcon" alt="" class="w-6 h-[15px]" />
            <span
              v-if="activeFilterCount > 0"
              class="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2FA6F3]"
            ></span>
          </button>

          <!-- Circular Search Button -->
          <button
            type="submit"
            aria-label="Search"
            class="rounded-full hover:opacity-95 transition-opacity cursor-pointer shrink-0"
          >
            <img :src="searchIcon" alt="Search" class="w-10 h-10" />
          </button>
        </div>

        <!-- Expandable 8-Field Filter Drawer -->
        <div
          v-if="filtersOpen"
          class="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-3"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Filter Vehicles
            </span>
            <button
              v-if="activeFilterCount > 0"
              type="button"
              class="text-xs font-medium text-[#0072BC] hover:underline cursor-pointer"
              @click="resetFilters"
            >
              Reset ({{ activeFilterCount }})
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <select
              v-model="selectedMake"
              aria-label="Make"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
            >
              <option value="">Make</option>
              <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
            </select>

            <select
              v-model="selectedModel"
              aria-label="Model"
              :disabled="!selectedMake"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="">{{ selectedMake ? 'Model' : 'Select make first' }}</option>
              <option v-for="model in availableModels" :key="model" :value="model">{{ model }}</option>
            </select>

            <select
              v-model="selectedCondition"
              aria-label="New / Used"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
            >
              <option value="">New / Used</option>
              <option v-for="cond in conditions" :key="cond" :value="cond">{{ cond }}</option>
            </select>

            <select
              v-model="selectedTransmission"
              aria-label="Transmission"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
            >
              <option value="">Transmission</option>
              <option v-for="trans in transmissions" :key="trans" :value="trans">{{ trans }}</option>
            </select>

            <select
              v-model="selectedFuel"
              aria-label="Fuel type"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
            >
              <option value="">Fuel type</option>
              <option v-for="fuel in fuelTypes" :key="fuel" :value="fuel">{{ fuel }}</option>
            </select>

            <select
              v-model="selectedMaxMileage"
              aria-label="Max mileage"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
            >
              <option value="">Max mileage</option>
              <option v-for="m in mileageOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
            </select>

            <select
              v-model="selectedMinPrice"
              aria-label="Min price"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
            >
              <option value="">Min price</option>
              <option v-for="p in minPriceOptions" :key="p.value" :value="p.value">{{ p.label }}</option>
            </select>

            <select
              v-model="selectedMaxPrice"
              aria-label="Max price"
              class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
            >
              <option value="">Max price</option>
              <option v-for="p in maxPriceOptions" :key="p.value" :value="p.value">{{ p.label }}</option>
            </select>
          </div>
        </div>

        <!-- Primary Action Pill -->
        <button
          type="submit"
          class="w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        >
          Find Your Next Car
        </button>
      </form>
    </div>
  </section>
</template>
