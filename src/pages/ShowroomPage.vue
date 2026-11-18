<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import filterIcon from '../images/filter-icon.svg'
import searchIcon from '../images/search-icon.svg'
import mileageIcon from '../images/supergroup-dealerships-mileage-icon.svg'
import fuelIcon from '../images/supergroup-dealerships-fuel-type-icon.svg'
import transmissionIcon from '../images/supergroup-dealerships-transmission-icon.svg'
import showroomVehicle1 from '../images/showroom-vehicle-1.jpg'
import showroomVehicle2 from '../images/showroom-vehicle-2.jpg'

const clioModules = import.meta.glob('../images/clio-*.jpg', {
  eager: true,
  import: 'default',
})

const clioGallery = Object.entries(clioModules)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/clio-(\d+)\.jpg$/)?.[1] || 0)
    const numB = Number(b.match(/clio-(\d+)\.jpg$/)?.[1] || 0)
    return numA - numB
  })
  .map(([, src]) => src)

const superCarryModules = import.meta.glob('../images/super-carry-*.jpg', {
  eager: true,
  import: 'default',
})

const superCarryGallery = Object.entries(superCarryModules)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/super-carry-(\d+)\.jpg$/)?.[1] || 0)
    const numB = Number(b.match(/super-carry-(\d+)\.jpg$/)?.[1] || 0)
    return numA - numB
  })
  .map(([, src]) => src)

const query = ref('')
const filtersOpen = ref(false)
const favorites = ref(new Set())
const activeImageByVehicle = ref({})
const galleryRefs = {}
const currentPage = ref(1)
const totalPages = 3815
const sortBy = ref('default')
const topSearchRef = ref(null)
const showStickyFilters = ref(false)
let observer = null

onMounted(() => {
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
  observer?.disconnect()
})

function openFiltersFromSticky() {
  filtersOpen.value = true
  topSearchRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
  Renault: ['Clio', 'Kwid', 'Triber', 'Kiger', 'Duster'],
  Suzuki: ['Super Carry', 'Swift', 'Jimny', 'Baleno', 'Fronx'],
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
    name: '2023 RENAULT CLIO',
    trim: '1.0T ZEN 5DR (66KW)',
    make: 'Renault',
    model: 'Clio',
    condition: 'Used',
    priceValue: 199900,
    price: 'R199 900',
    estPayment: 'R3 580 p/m*',
    mileageValue: 43987,
    mileage: '43 987 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    dealer: 'Suzuki Edenvale',
    images: clioGallery,
  },
  {
    id: 2,
    name: '2026 SUZUKI SUPER CARRY',
    trim: '1.2i P/U S/C (54KW)',
    make: 'Suzuki',
    model: 'Super Carry',
    condition: 'New',
    priceValue: 179900,
    price: 'R179 900',
    estPayment: 'R3 220 p/m*',
    mileageValue: 0,
    mileage: '0 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    dealer: 'Suzuki Bedfordview',
    images: superCarryGallery,
  },
  {
    id: 3,
    name: '2024 FORD RANGER XLT',
    trim: '2.0 SiT DOUBLE CAB 4X2 (125KW)',
    make: 'Ford',
    model: 'Ranger',
    condition: 'Used',
    priceValue: 629000,
    price: 'R629 000',
    estPayment: 'R11 280 p/m*',
    mileageValue: 18500,
    mileage: '18 500 km',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    dealer: 'Supergroup Ford Midrand',
    images: [showroomVehicle1, showroomVehicle2],
  },
  {
    id: 4,
    name: '2025 CHERY TIGGO 7 PRO MAX',
    trim: '1.6T EXECUTIVE DCT (145KW)',
    make: 'Chery',
    model: 'Tiggo 7 Pro Max',
    condition: 'New',
    priceValue: 529900,
    price: 'R529 900',
    estPayment: 'R9 490 p/m*',
    mileageValue: 10,
    mileage: '10 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    dealer: 'Supergroup Chery Fourways',
    images: [showroomVehicle2, showroomVehicle1],
  },
  {
    id: 5,
    name: '2022 HYUNDAI TUCSON 2.0',
    trim: 'PREMIUM AUTO 5DR (115KW)',
    make: 'Hyundai',
    model: 'Tucson',
    condition: 'Used',
    priceValue: 419900,
    price: 'R419 900',
    estPayment: 'R7 530 p/m*',
    mileageValue: 42500,
    mileage: '42 500 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    dealer: 'Supergroup Hyundai Boksburg',
    images: [showroomVehicle1, showroomVehicle2],
  },
  {
    id: 6,
    name: '2021 BMW 3 SERIES 320i',
    trim: 'M SPORT STEPTRONIC (135KW)',
    make: 'BMW',
    model: '3 Series',
    condition: 'Used',
    priceValue: 589000,
    price: 'R589 000',
    estPayment: 'R10 560 p/m*',
    mileageValue: 54000,
    mileage: '54 000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    dealer: 'Supergroup Auto Sandton',
    images: [showroomVehicle2, showroomVehicle1],
  },
  {
    id: 7,
    name: '2023 TOYOTA HILUX 2.4 GD-6',
    trim: 'RB RAIDER DOUBLE CAB (110KW)',
    make: 'Toyota',
    model: 'Hilux',
    condition: 'Used',
    priceValue: 549900,
    price: 'R549 900',
    estPayment: 'R9 860 p/m*',
    mileageValue: 31200,
    mileage: '31 200 km',
    transmission: 'Manual',
    fuelType: 'Diesel',
    dealer: 'Supergroup Toyota Centurion',
    images: [showroomVehicle1, showroomVehicle2],
  },
  {
    id: 8,
    name: '2020 MERCEDES-BENZ A200',
    trim: 'AMG LINE 7G-DCT (120KW)',
    make: 'Mercedes-Benz',
    model: 'A-Class',
    condition: 'Used',
    priceValue: 479900,
    price: 'R479 900',
    estPayment: 'R8 600 p/m*',
    mileageValue: 61800,
    mileage: '61 800 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    dealer: 'Supergroup Pre-Owned Menlyn',
    images: [showroomVehicle2, showroomVehicle1],
  },
]

const filteredVehicles = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = vehicles.filter((v) => {
    if (selectedMake.value && v.make !== selectedMake.value) return false
    if (selectedModel.value && v.model !== selectedModel.value) return false
    if (selectedCondition.value && v.condition !== selectedCondition.value) return false
    if (selectedTransmission.value && v.transmission !== selectedTransmission.value) return false
    if (selectedFuel.value && v.fuelType !== selectedFuel.value) return false
    if (selectedMaxMileage.value && v.mileageValue > Number(selectedMaxMileage.value)) return false
    if (selectedMinPrice.value && v.priceValue < Number(selectedMinPrice.value)) return false
    if (selectedMaxPrice.value && v.priceValue > Number(selectedMaxPrice.value)) return false
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

function toggleFavorite(id) {
  const next = new Set(favorites.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  favorites.value = next
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
  <div class="mx-auto max-w-[1400px] px-[20px] md:px-10 pt-6 pb-0 space-y-0">
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

    <!-- Sticky Filters Pill Bar (appears on scroll without shifting layout) -->
    <div class="sticky top-[102px] z-40 max-w-md mx-auto h-0 overflow-visible">
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

        <label class="inline-flex items-center gap-1.5 cursor-pointer shrink-0">
          <span class="font-medium text-[#0072BC]">Sort by:</span>
          <div class="relative inline-flex items-center">
            <select
              v-model="sortBy"
              aria-label="Sort vehicles"
              class="appearance-none bg-transparent pr-5 text-xs text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="default">Price - Default</option>
              <option value="price-asc">Price - Low to High</option>
              <option value="price-desc">Price - High to Low</option>
              <option value="mileage-asc">Mileage - Low to High</option>
            </select>
            <svg
              class="pointer-events-none absolute right-0 w-3.5 h-3.5 text-[#0072BC]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </label>
      </div>

      <article
        v-for="vehicle in filteredVehicles"
        :key="vehicle.id"
        class="rounded-[24px] border border-neutral-100 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <!-- Scrollable Vehicle Photo Gallery with Condition Pill & Favorite Heart -->
        <div class="relative aspect-[16/11] bg-neutral-100 overflow-hidden">
          <div
            :ref="(el) => setGalleryRef(vehicle.id, el)"
            class="flex w-full h-full overflow-x-auto snap-x snap-mandatory"
            style="scrollbar-width: none;"
            @scroll="onImageScroll(vehicle.id, $event)"
          >
            <img
              v-for="(img, idx) in vehicle.images"
              :key="idx"
              :src="img"
              :alt="`${vehicle.name} photo ${idx + 1}`"
              class="w-full h-full shrink-0 snap-start object-cover"
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
          <h3 class="text-base font-semibold text-neutral-800 uppercase leading-snug">
            {{ vehicle.name }}
          </h3>
          <p class="text-xs text-neutral-500 uppercase mt-0.5 mb-4" style="color: #737373; font-size: 12px;">
            {{ vehicle.trim }}
          </p>

          <!-- Price & Est. Payment Split -->
          <div class="flex items-center justify-between gap-3 mb-5">
            <div class="min-w-0">
              <div class="text-xs text-neutral-500 mb-1">Price</div>
              <div class="text-[42px] font-semibold text-[#0072BC] leading-none whitespace-nowrap">
                {{ vehicle.price }}
              </div>
            </div>

            <div class="shrink-0 border-l border-neutral-200 pl-3 space-y-1.5">
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
          <div class="flex items-center justify-center gap-1.5 text-xs text-neutral-700 mb-5">
            <svg class="w-4 h-4 text-[#0072BC] fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <span>{{ vehicle.dealer }}</span>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <a
              href="#contact"
              class="rounded-full border border-neutral-800 py-2.5 px-4 text-center text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              Enquire Now
            </a>
            <a
              href="#showroom"
              class="rounded-full py-2.5 px-4 text-center text-xs font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity"
            >
              View Details
            </a>
          </div>
        </div>
      </article>

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
