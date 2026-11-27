<script setup>
import { ref, computed, watch } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import filterIcon from '../../images/filter-icon.svg'
import searchIcon from '../../images/search-icon.svg'

const { activeDevice } = useDevicePreview()

defineProps({
  embedded: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['search'])

const query = ref('')
const filtersOpen = ref(false)

function handleSearchInputClick(event) {
  if (!filtersOpen.value) {
    event.preventDefault()
    event.target?.blur?.()
    filtersOpen.value = true
  }
}

const selectedMake = ref('')
const selectedModel = ref('')
const selectedCondition = ref('')
const selectedTransmission = ref('')
const selectedFuel = ref('')
const selectedMaxMileage = ref('')
const selectedMinPrice = ref('')
const selectedMaxPrice = ref('')

const modelsByMake = {
  'Alfa Romeo': ['Junior'],
  Renault: ['Clio', 'Kwid', 'Triber', 'Kiger', 'Duster'],
  Suzuki: ['Super Carry', 'Swift', 'Jimny', 'Baleno', 'Fronx'],
  GWM: ['Ora 5', 'Haval Jolion', 'Haval H6'],
  Geely: ['E2', 'Geometry C'],
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

const hasSearchCriteria = computed(
  () => activeFilterCount.value > 0 || Boolean(query.value.trim()),
)

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
  const payload = {
    query: query.value.trim(),
    make: selectedMake.value,
    model: selectedModel.value,
    condition: selectedCondition.value,
    transmission: selectedTransmission.value,
    fuelType: selectedFuel.value,
    maxMileage: selectedMaxMileage.value,
    minPrice: selectedMinPrice.value,
    maxPrice: selectedMaxPrice.value,
  }
  emit('search', payload)

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(payload)) {
    if (value !== '' && value !== null && value !== undefined) {
      params.set(key, String(value))
    }
  }
  const search = params.toString()
  window.location.hash = search ? `#showroom?${search}` : '#showroom'
}
</script>

<template>
  <section
    class="relative z-20 mx-auto max-w-[1000px]"
    :class="
      embedded
        ? '!my-0 w-full text-left'
        : [
            '!-mt-24 !mb-6 px-[10px]',
            activeDevice === 'mobile' ? 'block' : 'block md:hidden',
          ]
    "
  >
    <div
      class="overflow-hidden bg-white shadow-[0_12px_36px_rgba(0,10,49,0.12)] transition-[border-radius] duration-300 ease-out"
      :class="
        embedded
          ? [filtersOpen ? 'rounded-[28px]' : 'rounded-[38px]', 'p-2.5 md:p-3']
          : 'rounded-[28px] p-5'
      "
    >
      <form @submit.prevent="submitSearch">
        <!-- Search Row (inline pill + CTA on desktop embedded; stacked on mobile) -->
        <div :class="embedded ? 'flex items-center gap-3' : ''">
          <!-- Search Pill -->
          <div
            class="flex items-center gap-2 rounded-full bg-[#EAEAEA] pl-5 pr-1.5 py-1.5 border-2 border-transparent md:hover:border-[#0072BC] md:focus-within:border-[#0072BC] transition-colors duration-300"
            :class="embedded ? 'flex-1 min-w-0 h-[52px] pl-6 pr-3.5' : ''"
          >
            <input
              v-model="query"
              type="search"
              :readonly="!filtersOpen"
              :inputmode="filtersOpen ? 'search' : 'none'"
              placeholder="Type to start searching..."
              aria-label="Search vehicles"
              class="flex-1 min-w-0 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
              @click="handleSearchInputClick"
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

            <!-- Circular Search Button (Mobile Only) -->
            <button
              v-if="!embedded"
              type="submit"
              aria-label="Search"
              class="rounded-full hover:opacity-95 transition-opacity cursor-pointer shrink-0"
            >
              <img :src="searchIcon" alt="Search" class="w-10 h-10" />
            </button>
          </div>

          <!-- Inline Primary Action Pill (Desktop Embedded) -->
          <button
            v-if="embedded"
            type="submit"
            class="shrink-0 h-[52px] rounded-full px-7 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap"
          >
            {{ hasSearchCriteria ? 'Search' : 'Find Your Next Car' }}
          </button>
        </div>

        <!-- Expandable 8-Field Filter Drawer -->
        <div
          class="grid transition-all duration-300 ease-out"
          :class="
            filtersOpen
              ? 'grid-rows-[1fr] opacity-100 mt-4'
              : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
          "
        >
          <div class="overflow-hidden">
            <div class="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-3">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Filter Vehicles
            </span>
            <div class="flex items-center gap-2">
              <button
                v-if="activeFilterCount > 0"
                type="button"
                class="text-xs font-medium text-[#0072BC] hover:underline cursor-pointer"
                @click="resetFilters"
              >
                Reset ({{ activeFilterCount }})
              </button>
              <button
                type="button"
                aria-label="Close filter menu"
                class="p-1 rounded-full text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/70 transition-colors cursor-pointer"
                @click="filtersOpen = false"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div
            class="grid gap-2.5"
            :class="activeDevice === 'mobile' ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'"
          >
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
          </div>
        </div>

        <!-- Primary Action Pill (Mobile Stacked) -->
        <button
          v-if="!embedded"
          type="submit"
          class="mt-4 w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        >
          {{ hasSearchCriteria ? 'Search' : 'Find Your Next Car' }}
        </button>
      </form>
    </div>
  </section>
</template>
