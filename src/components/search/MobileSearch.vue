<script setup>
import { ref, computed } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import filterIcon from '../../images/filter-icon.svg'
import searchIcon from '../../images/search-icon.svg'

const { activeDevice } = useDevicePreview()

const emit = defineEmits(['search'])

const query = ref('')
const filtersOpen = ref(false)

const selectedMake = ref('All Makes')
const selectedBody = ref('All Body Types')
const selectedPrice = ref('Any Price')
const selectedCondition = ref('All')

const makes = ['All Makes', 'Toyota', 'Volkswagen', 'Ford', 'Hyundai', 'BMW', 'Mercedes-Benz', 'Kia', 'Nissan']
const bodyTypes = ['All Body Types', 'SUV', 'Hatchback', 'Sedan', 'Bakkie / Pickup', 'Crossover']
const priceRanges = ['Any Price', 'Under R250,000', 'R250,000 – R500,000', 'R500,000 – R850,000', 'R850,000+']
const conditions = ['All', 'New', 'Demo', 'Pre-Owned']

const activeFilterCount = computed(() => {
  let count = 0
  if (selectedMake.value !== 'All Makes') count++
  if (selectedBody.value !== 'All Body Types') count++
  if (selectedPrice.value !== 'Any Price') count++
  if (selectedCondition.value !== 'All') count++
  return count
})

function resetFilters() {
  selectedMake.value = 'All Makes'
  selectedBody.value = 'All Body Types'
  selectedPrice.value = 'Any Price'
  selectedCondition.value = 'All'
}

function submitSearch() {
  emit('search', {
    query: query.value.trim(),
    make: selectedMake.value,
    bodyType: selectedBody.value,
    priceRange: selectedPrice.value,
    condition: selectedCondition.value,
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

        <!-- Expandable Mobile Filter Drawer -->
        <div
          v-if="filtersOpen"
          class="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-4"
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

          <!-- Condition Pills -->
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="item in conditions"
              :key="item"
              type="button"
              class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
              :class="
                selectedCondition === item
                  ? 'bg-[#0072BC] text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
              "
              @click="selectedCondition = item"
            >
              {{ item }}
            </button>
          </div>

          <div class="grid grid-cols-1 gap-3">
            <label class="block text-xs font-medium text-neutral-600">
              Make
              <select
                v-model="selectedMake"
                class="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#0072BC]"
              >
                <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
              </select>
            </label>

            <label class="block text-xs font-medium text-neutral-600">
              Body Type
              <select
                v-model="selectedBody"
                class="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#0072BC]"
              >
                <option v-for="body in bodyTypes" :key="body" :value="body">{{ body }}</option>
              </select>
            </label>

            <label class="block text-xs font-medium text-neutral-600">
              Price Range
              <select
                v-model="selectedPrice"
                class="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#0072BC]"
              >
                <option v-for="price in priceRanges" :key="price" :value="price">{{ price }}</option>
              </select>
            </label>
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
