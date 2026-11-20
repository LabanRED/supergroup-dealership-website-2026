<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from '../composables/useDevicePreview.js'
import { useWishlist } from '../composables/useWishlist.js'
import { createDragScrollHandler } from '../composables/useDragScroll.js'
import filterIcon from '../images/filter-icon.svg'
import searchIcon from '../images/search-icon.svg'
import mileageIcon from '../images/supergroup-dealerships-mileage-icon.svg'
import fuelIcon from '../images/supergroup-dealerships-fuel-type-icon.svg'
import transmissionIcon from '../images/supergroup-dealerships-transmission-icon.svg'
import hybridHevIcon from '../images/hybrid-hev-icon.svg'
import electricIcon from '../images/electric-icon.svg'
import { vehicles } from '../data/vehicles.js'
import FinanceCalculator from '../components/vehicle/FinanceCalculator.vue'
import VehicleEnquire from '../components/vehicle/VehicleEnquire.vue'

const { activeDevice } = useDevicePreview()
const { favorites, toggleFavorite } = useWishlist()
const handleGalleryMouseDown = createDragScrollHandler({ snapToSlide: true })
const query = ref('')
const filtersOpen = ref(false)
const openCalculatorId = ref(null)
const openEnquireId = ref(null)
const activeImageByVehicle = ref({})

async function toggleCalculator(vehicleId) {
  if (openCalculatorId.value === vehicleId) {
    openCalculatorId.value = null
    return
  }
  openEnquireId.value = null
  openCalculatorId.value = vehicleId
  await nextTick()
  document
    .getElementById(`showroom-calculator-${vehicleId}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function toggleEnquire(vehicleId) {
  if (openEnquireId.value === vehicleId) {
    openEnquireId.value = null
    return
  }
  openCalculatorId.value = null
  openEnquireId.value = vehicleId
  await nextTick()
  document
    .getElementById(`showroom-enquire-${vehicleId}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const galleryRefs = {}
const currentPage = ref(1)
const totalPages = 3815
const sortBy = ref('default')
const sortOptions = [
  { value: 'default', label: 'Price - Default' },
  { value: 'price-asc', label: 'Price - Low to High' },
  { value: 'price-desc', label: 'Price - High to Low' },
  { value: 'mileage-asc', label: 'Mileage - Low to High' },
]
const sortLabel = computed(
  () => sortOptions.find((opt) => opt.value === sortBy.value)?.label ?? 'Price - Default',
)
const topSearchRef = ref(null)
const showStickyFilters = ref(false)
let observer = null

onMounted(() => {
  applyFiltersFromHash()
  window.addEventListener('hashchange', applyFiltersFromHash)
  if (!topSearchRef.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    ([entry]) => {
      showStickyFilters.value = !entry.isIntersecting
    },
    {
      threshold: 0,
      rootMargin: '-102px 0px 0px 0px',
    }
  )
  observer.observe(topSearchRef.value)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', applyFiltersFromHash)
  observer?.disconnect()
})

function openFiltersFromSticky() {
  filtersOpen.value = true
  topSearchRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const selectedMake = ref('')
const selectedModel = ref('')
const selectedMinYear = ref('')
const selectedMaxYear = ref('')
const selectedMinPrice = ref('')
const selectedMaxPrice = ref('')
const selectedMaxMileage = ref('')
const selectedCondition = ref('')
const selectedTransmission = ref('')
const selectedFuel = ref('')
const selectedBodyType = ref('')
const selectedDealer = ref('')

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
  if (!availableModels.value.includes(selectedModel.value)) {
    selectedModel.value = ''
  }
})

function applyFiltersFromHash() {
  if (typeof window === 'undefined') return
  const [, queryString = ''] = window.location.hash.split('?')
  if (!queryString) return
  const params = new URLSearchParams(queryString)
  if (params.has('query')) query.value = params.get('query') || ''
  if (params.has('make')) selectedMake.value = params.get('make') || ''
  if (params.has('model')) selectedModel.value = params.get('model') || ''
  if (params.has('condition')) selectedCondition.value = params.get('condition') || ''
  if (params.has('transmission')) selectedTransmission.value = params.get('transmission') || ''
  if (params.has('fuelType')) selectedFuel.value = params.get('fuelType') || ''
  if (params.has('maxMileage')) selectedMaxMileage.value = params.get('maxMileage') || ''
  if (params.has('minPrice')) selectedMinPrice.value = params.get('minPrice') || ''
  if (params.has('maxPrice')) selectedMaxPrice.value = params.get('maxPrice') || ''
}

const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020]
const conditions = ['New', 'Demo', 'Used']
const transmissions = ['Automatic', 'Manual']
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
const bodyTypes = ['Hatchback', 'Bakkie / Pickup', 'SUV', 'Cross-Over', 'Sedan']
const dealers = [
  'Arnold Chatz Cars',
  'Suzuki Edenvale',
  'Suzuki Bedfordview',
  'Lionel Motors Renault',
  'GWM Haval Benoni',
  'Geely Rustenburg',
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

const filteredVehicles = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = vehicles.filter((v) => {
    if (selectedMake.value && v.make !== selectedMake.value) return false
    if (selectedModel.value && v.model !== selectedModel.value) return false
    if (selectedMinYear.value && v.year < Number(selectedMinYear.value)) return false
    if (selectedMaxYear.value && v.year > Number(selectedMaxYear.value)) return false
    if (selectedMinPrice.value && v.priceValue < Number(selectedMinPrice.value)) return false
    if (selectedMaxPrice.value && v.priceValue > Number(selectedMaxPrice.value)) return false
    if (selectedMaxMileage.value && v.mileageValue > Number(selectedMaxMileage.value)) return false
    if (selectedCondition.value && v.condition !== selectedCondition.value) return false
    if (selectedTransmission.value && v.transmission !== selectedTransmission.value) return false
    if (selectedFuel.value && v.fuelType !== selectedFuel.value) return false
    if (selectedBodyType.value && v.bodyType !== selectedBodyType.value) return false
    if (selectedDealer.value && v.dealer !== selectedDealer.value) return false
    if (q && !`${v.name} ${v.trim} ${v.dealer} ${v.fuelType}`.toLowerCase().includes(q)) return false
    return true
  })

  if (sortBy.value === 'price-asc') {
    return [...list].sort((a, b) => a.priceValue - b.priceValue)
  }
  if (sortBy.value === 'price-desc') {
    return [...list].sort((a, b) => b.priceValue - a.priceValue)
  }
  if (sortBy.value === 'mileage-asc') {
    return [...list].sort((a, b) => a.mileageValue - b.mileageValue)
  }
  return list
})

const activeFilterCount = computed(() => {
  return [
    selectedMake.value,
    selectedModel.value,
    selectedMinYear.value,
    selectedMaxYear.value,
    selectedMinPrice.value,
    selectedMaxPrice.value,
    selectedMaxMileage.value,
    selectedCondition.value,
    selectedTransmission.value,
    selectedFuel.value,
    selectedBodyType.value,
    selectedDealer.value,
  ].filter(Boolean).length
})

const hasActiveFilters = computed(() => {
  return (
    activeFilterCount.value > 0 ||
    Boolean(query.value.trim()) ||
    sortBy.value !== 'default'
  )
})

function resetFilters() {
  query.value = ''
  selectedMake.value = ''
  selectedModel.value = ''
  selectedMinYear.value = ''
  selectedMaxYear.value = ''
  selectedMinPrice.value = ''
  selectedMaxPrice.value = ''
  selectedMaxMileage.value = ''
  selectedCondition.value = ''
  selectedTransmission.value = ''
  selectedFuel.value = ''
  selectedBodyType.value = ''
  selectedDealer.value = ''
  sortBy.value = 'default'
  if (typeof window !== 'undefined' && window.location.hash.startsWith('#showroom?')) {
    window.history.replaceState(null, '', '#showroom')
  }
}

function clearAllAndReset() {
  resetFilters()
  filtersOpen.value = false
}

function setGalleryRef(id, el) {
  if (el) galleryRefs[id] = el
}

function onImageScroll(vehicleId, event) {
  const el = event.target
  if (!el || !el.clientWidth) return
  const idx = Math.round(el.scrollLeft / el.clientWidth)
  activeImageByVehicle.value = {
    ...activeImageByVehicle.value,
    [vehicleId]: idx,
  }
}

function scrollVehicleImage(vehicleId, idx) {
  const el = galleryRefs[vehicleId]
  if (!el) return
  el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
  activeImageByVehicle.value = {
    ...activeImageByVehicle.value,
    [vehicleId]: idx,
  }
}
</script>

<template>
  <div
    class="mx-auto max-w-[1400px] pt-6 pb-0 space-y-0"
    :class="activeDevice === 'mobile' ? 'px-[20px]' : 'px-[20px] md:px-10'"
  >
    <!-- Browse Our Showroom Search Card -->
    <section ref="topSearchRef" class="!my-0 max-w-md mx-auto">
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
        <p class="text-lg text-neutral-700 leading-relaxed mb-6" style="color: #404040;">
          Find your vehicle from our<br />
          <strong class="font-semibold text-neutral-900">2 000+</strong> quality dealerships stock
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

          <!-- Expandable 12-Field Filter Panel -->
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
                v-model="selectedMinYear"
                aria-label="Min Year"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Min Year</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>

              <select
                v-model="selectedMaxYear"
                aria-label="Max Year"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Max Year</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>

              <select
                v-model="selectedMinPrice"
                aria-label="Min Price"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Min Price</option>
                <option v-for="p in minPriceOptions" :key="p.value" :value="p.value">{{ p.label }}</option>
              </select>

              <select
                v-model="selectedMaxPrice"
                aria-label="Max Price"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Max Price</option>
                <option v-for="p in maxPriceOptions" :key="p.value" :value="p.value">{{ p.label }}</option>
              </select>

              <select
                v-model="selectedCondition"
                aria-label="Vehicle Type"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Vehicle Type</option>
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
                aria-label="Fuel Type"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Fuel Type</option>
                <option v-for="fuel in fuelTypes" :key="fuel" :value="fuel">{{ fuel }}</option>
              </select>

              <select
                v-model="selectedBodyType"
                aria-label="Body Type"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Body Type</option>
                <option v-for="body in bodyTypes" :key="body" :value="body">{{ body }}</option>
              </select>

              <select
                v-model="selectedDealer"
                aria-label="Dealer"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="">Dealer</option>
                <option v-for="d in dealers" :key="d" :value="d">{{ d }}</option>
              </select>

              <select
                v-model="sortBy"
                aria-label="Sort By"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0072BC]"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price - Low to High</option>
                <option value="price-desc">Price - High to Low</option>
                <option value="mileage-asc">Mileage - Low to High</option>
              </select>
            </div>

            <button
              type="button"
              class="w-full rounded-lg py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#0072BC] hover:bg-[#005f9e] transition-colors cursor-pointer"
              @click="filtersOpen = false"
            >
              Apply Filter
            </button>
          </div>

          <!-- Search CTA (Default vs Filtered State) -->
          <div v-if="hasActiveFilters" class="grid grid-cols-2 gap-3">
            <button
              type="submit"
              class="w-full rounded-full py-3.5 px-6 text-sm font-medium text-neutral-900 bg-white border border-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              class="w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
              @click="clearAllAndReset"
            >
              Clear All
            </button>
          </div>
          <button
            v-else
            type="submit"
            class="w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </section>

    <!-- Sticky Filters Pill Bar (appears on scroll without shifting layout) -->
    <div
      class="sticky z-40 max-w-md mx-auto h-0 overflow-visible"
      :class="activeDevice === 'mobile' ? 'top-[102px]' : 'top-[102px] lg:top-[118px]'"
    >
      <div
        class="bg-white/95 backdrop-blur-sm py-2 transition-all duration-200"
        :class="
          showStickyFilters
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        "
      >
        <div
          class="rounded-full border border-[#2FA6F3] bg-white px-5 py-3 flex items-center justify-between shadow-sm"
        >
          <button
            type="button"
            class="inline-flex items-center gap-2.5 text-sm font-medium text-[#0072BC] cursor-pointer"
            @click="openFiltersFromSticky"
          >
            <img :src="filterIcon" alt="" class="w-5 h-[13px]" />
            <span>Filters</span>
          </button>

          <button
            type="button"
            class="text-sm font-medium text-[#0072BC] hover:underline cursor-pointer"
            @click="resetFilters"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>

    <!-- Featured Stock Results -->
    <section class="!my-0 !pt-[30px] max-w-md mx-auto space-y-5">
      <!-- Showing & Sort By Row -->
      <div class="flex items-center justify-between gap-2 text-xs text-neutral-700 px-1 whitespace-nowrap">
        <div>
          <span>Showing </span>
          <span class="font-medium text-[#0072BC]">
            {{ filteredVehicles.length ? `1 - ${filteredVehicles.length}` : '0' }} of 2066
          </span>
        </div>

        <label class="ml-auto inline-flex items-center justify-end gap-1.5 cursor-pointer shrink-0 text-right">
          <span class="font-medium text-[#0072BC]">Sort by:</span>
          <div class="relative inline-flex items-center gap-1">
            <span class="text-xs text-neutral-800">{{ sortLabel }}</span>
            <svg
              class="pointer-events-none w-3.5 h-3.5 text-[#0072BC] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
            <select
              v-model="sortBy"
              aria-label="Sort vehicles"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </label>
      </div>

      <div
        v-for="vehicle in filteredVehicles"
        :key="vehicle.id"
        class="space-y-3"
      >
      <article
        class="rounded-[24px] border border-neutral-100 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <!-- Scrollable Vehicle Photo Gallery with Condition Pill & Favorite Heart -->
        <div class="relative aspect-[16/11] bg-neutral-100 overflow-hidden">
          <div
            :ref="(el) => setGalleryRef(vehicle.id, el)"
            class="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none"
            style="scrollbar-width: none;"
            @scroll="onImageScroll(vehicle.id, $event)"
            @mousedown="handleGalleryMouseDown"
            @dragstart.prevent
          >
            <img
              v-for="(img, idx) in vehicle.images"
              :key="idx"
              :src="img"
              :alt="`${vehicle.name} photo ${idx + 1}`"
              draggable="false"
              class="w-full h-full shrink-0 snap-start snap-always object-cover"
            />
          </div>

          <span
            v-if="vehicle.condition !== 'Used'"
            class="absolute top-3 left-3 px-3.5 py-1 rounded-full text-xs font-medium shadow-sm"
            :class="
              vehicle.condition === 'Demo'
                ? 'bg-white text-[#0072BC]'
                : 'bg-[#0072BC] text-white'
            "
          >
            {{ vehicle.condition }}
          </span>

          <button
            type="button"
            aria-label="Save vehicle"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center cursor-pointer transition-transform active:scale-95"
            @click="toggleFavorite(vehicle.id)"
          >
            <svg
              class="w-4 h-4"
              :class="favorites.has(vehicle.id) ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-red-500'"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21s-6.7-4.35-9.2-8.1C.8 9.9 2.3 5.5 6.4 4.8c2.2-.38 4.2.58 5.6 2.15 1.4-1.57 3.4-2.53 5.6-2.15 4.1.7 5.6 5.1 3.6 8.1C18.7 16.65 12 21 12 21z"
              />
            </svg>
          </button>
        </div>

        <div class="p-5">
          <!-- Photo Count + Carousel Dots -->
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="inline-flex items-center gap-1 text-xs font-medium text-[#0072BC]">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" />
              </svg>
              <span>{{ vehicle.images.length >= 12 ? '12+' : vehicle.images.length }}</span>
            </span>

            <div class="flex items-center gap-1.5">
              <button
                v-for="(_, idx) in vehicle.images"
                :key="idx"
                type="button"
                :aria-label="`View photo ${idx + 1}`"
                class="w-2 h-2 rounded-full transition-colors cursor-pointer"
                :class="(activeImageByVehicle[vehicle.id] || 0) === idx ? 'bg-[#0072BC]' : 'bg-neutral-300'"
                @click="scrollVehicleImage(vehicle.id, idx)"
              ></button>
            </div>
          </div>

          <!-- Title & Trim -->
          <h3 class="text-base font-semibold text-neutral-800 leading-snug">
            <span class="block text-[#0072BC]">{{ vehicle.year }}</span>
            <span class="inline-flex items-center gap-1.5">
              <span>{{ vehicle.make }} {{ vehicle.model }}</span>
              <img
                v-if="vehicle.fuelType === 'Hybrid'"
                :src="hybridHevIcon"
                alt="Hybrid"
                class="w-4 h-4 shrink-0"
              />
              <img
                v-else-if="vehicle.fuelType === 'Electric'"
                :src="electricIcon"
                alt="Electric"
                class="w-4 h-4 shrink-0"
              />
            </span>
          </h3>
          <p class="text-xs text-neutral-500 uppercase mt-0.5 mb-4" style="color: #737373; font-size: 12px;">
            {{ vehicle.trim }}
          </p>

          <!-- Price & Est. Payment Split -->
          <div class="flex items-center justify-between gap-[10px] mb-5">
            <div class="min-w-0">
              <div class="text-xs text-neutral-500 mb-1">Price</div>
              <div class="text-[42px] font-semibold text-[#0072BC] leading-none whitespace-nowrap">
                {{ vehicle.price }}
              </div>
            </div>

            <div class="shrink-0 border-l border-[#969696] pl-[10px] space-y-1.5">
              <div class="text-[11px] text-neutral-500">Est. Payment</div>
              <div class="text-xs font-medium text-neutral-800 flex items-center gap-1">
                <span>{{ vehicle.estPayment }}</span>
                <span
                  class="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-neutral-400 text-[9px] text-neutral-500"
                >
                  i
                </span>
              </div>
              <button
                type="button"
                class="w-full rounded bg-neutral-300/80 hover:bg-neutral-300 py-1.5 px-3 text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
                @click="toggleCalculator(vehicle.id)"
              >
                Calculator
              </button>
            </div>
          </div>

          <!-- 3-Icon Spec Row -->
          <div class="grid grid-cols-3 gap-2 py-2 text-xs text-neutral-700 mb-3">
            <div class="flex items-center gap-1.5">
              <img :src="mileageIcon" alt="" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ vehicle.mileage }}</span>
            </div>
            <div class="flex items-center justify-center gap-1.5">
              <img :src="fuelIcon" alt="" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ vehicle.fuelType }}</span>
            </div>
            <div class="flex items-center justify-end gap-1.5">
              <img :src="transmissionIcon" alt="" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ vehicle.transmission }}</span>
            </div>
          </div>

          <!-- Dealer Location -->
          <div class="flex items-center justify-start gap-1.5 text-xs text-neutral-700 mb-5">
            <svg class="w-4 h-4 text-[#0072BC] fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <span>{{ vehicle.dealer }}</span>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="rounded-full border border-neutral-800 py-2.5 px-4 text-center text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              @click="toggleEnquire(vehicle.id)"
            >
              Enquire Now
            </button>
            <a
              :href="`#vehicle-detail?id=${vehicle.id}`"
              class="rounded-full py-2.5 px-4 text-center text-xs font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity"
            >
              View Details
            </a>
          </div>
        </div>
      </article>

      <FinanceCalculator
        v-if="openCalculatorId === vehicle.id"
        :id="`showroom-calculator-${vehicle.id}`"
        :vehicle="vehicle"
        :class="activeDevice === 'mobile' ? 'scroll-mt-[172px]' : 'scroll-mt-[188px]'"
        @close="openCalculatorId = null"
      />

      <VehicleEnquire
        v-if="openEnquireId === vehicle.id"
        :section-id="`showroom-enquire-${vehicle.id}`"
        :vehicle-name="vehicle.name"
        :closable="true"
        :class="activeDevice === 'mobile' ? 'scroll-mt-[172px]' : 'scroll-mt-[188px]'"
        @close="openEnquireId = null"
      />
      </div>

      <div
        v-if="filteredVehicles.length === 0"
        class="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center text-sm text-neutral-600"
      >
        No matching vehicles found. Try clearing your filters.
      </div>
    </section>

    <!-- Pagination -->
    <nav
      aria-label="Showroom pagination"
      class="max-w-md mx-auto pt-[30px] pb-[50px] flex items-center justify-center gap-3 text-sm"
    >
      <button
        type="button"
        class="inline-flex items-center gap-1 text-neutral-700 hover:text-[#0072BC] transition-colors cursor-pointer disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="currentPage = Math.max(1, currentPage - 1)"
      >
        <svg class="w-4 h-4 text-[#0072BC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </button>

      <div class="flex items-center gap-1.5">
        <button
          v-for="page in [1, 2, 3]"
          :key="page"
          type="button"
          class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors cursor-pointer"
          :class="
            currentPage === page
              ? 'bg-[#0072BC] text-white'
              : 'text-[#0072BC] hover:bg-[#0072BC]/10'
          "
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <span class="px-1 text-[#0072BC]">...</span>

        <button
          type="button"
          class="px-2 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors cursor-pointer"
          :class="
            currentPage === totalPages
              ? 'bg-[#0072BC] text-white'
              : 'text-[#0072BC] hover:bg-[#0072BC]/10'
          "
          @click="currentPage = totalPages"
        >
          {{ totalPages }}
        </button>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-1 text-neutral-700 hover:text-[#0072BC] transition-colors cursor-pointer disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="currentPage = Math.min(totalPages, currentPage + 1)"
      >
        <span>Next</span>
        <svg class="w-4 h-4 text-[#0072BC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  </div>
</template>
