<script setup>
import { ref, computed, watch } from 'vue'
import filterIcon from '../images/filter-icon.svg'
import searchIcon from '../images/search-icon.svg'

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

const vehicles = [
  {
    id: 1,
    name: '2025 Toyota Corolla Cross 1.8 XR',
    make: 'Toyota',
    model: 'Corolla Cross',
    condition: 'New',
    priceValue: 498900,
    price: 'R 498,900',
    mileageValue: 15,
    mileage: '15 km',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    dealer: 'Supergroup Toyota Sandton',
  },
  {
    id: 2,
    name: '2024 Volkswagen Polo 1.0 TSI Life',
    make: 'Volkswagen',
    model: 'Polo',
    condition: 'Demo',
    priceValue: 364900,
    price: 'R 364,900',
    mileageValue: 4200,
    mileage: '4,200 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    dealer: 'Supergroup VW Johannesburg',
  },
  {
    id: 3,
    name: '2024 Ford Ranger 2.0 SiT Double Cab XLT',
    make: 'Ford',
    model: 'Ranger',
    condition: 'Used',
    priceValue: 629000,
    price: 'R 629,000',
    mileageValue: 18500,
    mileage: '18,500 km',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    dealer: 'Supergroup Ford Midrand',
  },
  {
    id: 4,
    name: '2025 Chery Tiggo 7 Pro Max 1.6T',
    make: 'Chery',
    model: 'Tiggo 7 Pro Max',
    condition: 'New',
    priceValue: 529900,
    price: 'R 529,900',
    mileageValue: 10,
    mileage: '10 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    dealer: 'Supergroup Chery Fourways',
  },
]

const filteredVehicles = computed(() => {
  const q = query.value.trim().toLowerCase()
  return vehicles.filter((v) => {
    if (selectedMake.value && v.make !== selectedMake.value) return false
    if (selectedModel.value && v.model !== selectedModel.value) return false
    if (selectedCondition.value && v.condition !== selectedCondition.value) return false
    if (selectedTransmission.value && v.transmission !== selectedTransmission.value) return false
    if (selectedFuel.value && v.fuelType !== selectedFuel.value) return false
    if (selectedMaxMileage.value && v.mileageValue > Number(selectedMaxMileage.value)) return false
    if (selectedMinPrice.value && v.priceValue < Number(selectedMinPrice.value)) return false
    if (selectedMaxPrice.value && v.priceValue > Number(selectedMaxPrice.value)) return false
    if (q && !`${v.name} ${v.dealer} ${v.fuelType}`.toLowerCase().includes(q)) return false
    return true
  })
})

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
  query.value = ''
  selectedMake.value = ''
  selectedModel.value = ''
  selectedCondition.value = ''
  selectedTransmission.value = ''
  selectedFuel.value = ''
  selectedMaxMileage.value = ''
  selectedMinPrice.value = ''
  selectedMaxPrice.value = ''
}
</script>

<template>
  <div class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-6 space-y-6">
    <!-- Browse Our Showroom Search Card -->
    <section class="!my-0 max-w-md mx-auto">
      <div
        class="rounded-[28px] border border-[#2FA6F3] bg-white px-5 py-6 text-center shadow-[0_6px_24px_rgba(0,114,188,0.08)]"
      >
        <p class="text-base text-neutral-600 mb-1" style="color: #525252;">
          Browse Our
        </p>
        <h1
          class="font-poppins font-medium text-[#0072BC] mb-3"
          style="font-size: 36px; line-height: 1.15; font-weight: 500;"
        >
          Showroom
        </h1>
        <p class="text-sm text-neutral-700 leading-relaxed mb-6" style="color: #404040;">
          Find your vehicle from our<br />
          <strong class="font-semibold text-neutral-900">1 800+</strong> quality dealerships stock
        </p>

        <form class="space-y-4 text-left" @submit.prevent="filtersOpen = false">
          <!-- Search Input Box -->
          <div
            class="flex items-center gap-2 rounded-full border border-neutral-200 bg-white pl-5 pr-1.5 py-1.5"
          >
            <input
              v-model="query"
              type="search"
              placeholder="Type to start searching..."
              aria-label="Search showroom vehicles"
              class="flex-1 min-w-0 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />

            <button
              type="button"
              class="relative p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle showroom filters"
              :aria-expanded="filtersOpen"
              @click="filtersOpen = !filtersOpen"
            >
              <img :src="filterIcon" alt="" class="w-6 h-[15px]" />
              <span
                v-if="activeFilterCount > 0"
                class="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2FA6F3]"
              ></span>
            </button>

            <button
              type="submit"
              aria-label="Search"
              class="rounded-full hover:opacity-95 transition-opacity cursor-pointer shrink-0"
            >
              <img :src="searchIcon" alt="Search" class="w-10 h-10" />
            </button>
          </div>

          <!-- Expandable 8-Field Filter Panel -->
          <div
            v-if="filtersOpen"
            class="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-3"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Filters
              </span>
              <button
                v-if="activeFilterCount > 0 || query"
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

          <!-- Search CTA -->
          <button
            type="submit"
            class="w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </section>

    <!-- Featured Stock Results -->
    <section class="!my-0 max-w-md mx-auto space-y-3">
      <div class="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span>Showing {{ filteredVehicles.length }} featured vehicles</span>
        <button
          v-if="activeFilterCount > 0 || query"
          type="button"
          class="text-[#0072BC] font-medium hover:underline cursor-pointer"
          @click="resetFilters"
        >
          Clear all
        </button>
      </div>

      <article
        v-for="vehicle in filteredVehicles"
        :key="vehicle.id"
        class="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm space-y-2"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0072BC]/10 text-[#0072BC]">
            {{ vehicle.condition }}
          </span>
          <span class="text-sm font-semibold text-neutral-900">{{ vehicle.price }}</span>
        </div>

        <h3 class="text-base font-medium text-neutral-900">{{ vehicle.name }}</h3>

        <div class="flex items-center gap-3 text-xs text-neutral-500">
          <span>{{ vehicle.mileage }}</span>
          <span>•</span>
          <span>{{ vehicle.transmission }}</span>
          <span>•</span>
          <span>{{ vehicle.fuelType }}</span>
        </div>

        <div class="pt-1 text-xs text-neutral-600">{{ vehicle.dealer }}</div>
      </article>

      <div
        v-if="filteredVehicles.length === 0"
        class="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center text-sm text-neutral-600"
      >
        No matching vehicles found. Try clearing your filters.
      </div>
    </section>
  </div>
</template>
