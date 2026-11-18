<script setup>
import { ref, computed } from 'vue'
import filterIcon from '../images/filter-icon.svg'
import searchIcon from '../images/search-icon.svg'

const query = ref('')
const filtersOpen = ref(false)
const selectedMake = ref('All Makes')
const selectedBody = ref('All Body Types')
const selectedCondition = ref('All')

const makes = ['All Makes', 'Toyota', 'Volkswagen', 'Ford', 'Hyundai', 'BMW', 'Mercedes-Benz', 'Chery']
const bodyTypes = ['All Body Types', 'SUV', 'Hatchback', 'Sedan', 'Bakkie / Pickup']
const conditions = ['All', 'New', 'Demo', 'Pre-Owned']

const vehicles = [
  {
    id: 1,
    name: '2025 Toyota Corolla Cross 1.8 XR',
    make: 'Toyota',
    bodyType: 'SUV',
    condition: 'New',
    price: 'R 498,900',
    mileage: '15 km',
    transmission: 'Automatic',
    dealer: 'Supergroup Toyota Sandton',
  },
  {
    id: 2,
    name: '2024 Volkswagen Polo 1.0 TSI Life',
    make: 'Volkswagen',
    bodyType: 'Hatchback',
    condition: 'Demo',
    price: 'R 364,900',
    mileage: '4,200 km',
    transmission: 'Manual',
    dealer: 'Supergroup VW Johannesburg',
  },
  {
    id: 3,
    name: '2024 Ford Ranger 2.0 SiT Double Cab XLT',
    make: 'Ford',
    bodyType: 'Bakkie / Pickup',
    condition: 'Pre-Owned',
    price: 'R 629,000',
    mileage: '18,500 km',
    transmission: 'Automatic',
    dealer: 'Supergroup Ford Midrand',
  },
  {
    id: 4,
    name: '2025 Chery Tiggo 7 Pro Max 1.6T',
    make: 'Chery',
    bodyType: 'SUV',
    condition: 'New',
    price: 'R 529,900',
    mileage: '10 km',
    transmission: 'Automatic',
    dealer: 'Supergroup Chery Fourways',
  },
]

const filteredVehicles = computed(() => {
  const q = query.value.trim().toLowerCase()
  return vehicles.filter((v) => {
    if (selectedMake.value !== 'All Makes' && v.make !== selectedMake.value) return false
    if (selectedBody.value !== 'All Body Types' && v.bodyType !== selectedBody.value) return false
    if (selectedCondition.value !== 'All' && v.condition !== selectedCondition.value) return false
    if (q && !`${v.name} ${v.dealer} ${v.bodyType}`.toLowerCase().includes(q)) return false
    return true
  })
})

const activeFilterCount = computed(() => {
  let count = 0
  if (selectedMake.value !== 'All Makes') count++
  if (selectedBody.value !== 'All Body Types') count++
  if (selectedCondition.value !== 'All') count++
  return count
})

function resetFilters() {
  query.value = ''
  selectedMake.value = 'All Makes'
  selectedBody.value = 'All Body Types'
  selectedCondition.value = 'All'
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
            class="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white pl-4 pr-1.5 py-1.5"
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

          <!-- Expandable Filter Panel -->
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
                Reset
              </button>
            </div>

            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="item in conditions"
                :key="item"
                type="button"
                class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
                :class="
                  selectedCondition === item
                    ? 'bg-[#0072BC] text-white'
                    : 'bg-white text-neutral-700 border border-neutral-200'
                "
                @click="selectedCondition = item"
              >
                {{ item }}
              </button>
            </div>

            <div class="grid grid-cols-1 gap-2.5">
              <select
                v-model="selectedMake"
                aria-label="Filter by make"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#0072BC]"
              >
                <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
              </select>

              <select
                v-model="selectedBody"
                aria-label="Filter by body type"
                class="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#0072BC]"
              >
                <option v-for="body in bodyTypes" :key="body" :value="body">{{ body }}</option>
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
          <span>{{ vehicle.bodyType }}</span>
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
