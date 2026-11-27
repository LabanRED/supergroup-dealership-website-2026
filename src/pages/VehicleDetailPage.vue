<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useDevicePreview } from '../composables/useDevicePreview.js'
import { useWishlist } from '../composables/useWishlist.js'
import { useChromeTheme } from '../composables/useChromeTheme.js'
import { createDragScrollHandler } from '../composables/useDragScroll.js'
import { useStockFeed } from '../composables/useStockFeed.js'
import hybridHevIcon from '../images/hybrid-hev-icon.svg'
import electricIcon from '../images/electric-icon.svg'
import VehicleOverview from '../components/vehicle/VehicleOverview.vue'
import VehicleSpecifications from '../components/vehicle/VehicleSpecifications.vue'
import SupergroupDivider from '../components/common/SupergroupDivider.vue'
import VehicleEnquire from '../components/vehicle/VehicleEnquire.vue'
import FinanceCalculator from '../components/vehicle/FinanceCalculator.vue'
import DealerLocation from '../components/vehicle/DealerLocation.vue'
import MoreFromDealer from '../components/vehicle/MoreFromDealer.vue'
import SimilarVehicles from '../components/vehicle/SimilarVehicles.vue'
import VehicleBadges from '../components/vehicle/VehicleBadges.vue'

const { activeDevice } = useDevicePreview()
const { isFavorite, toggleFavorite } = useWishlist()
const { chromeBg } = useChromeTheme()
const { stockVehicles } = useStockFeed()
const handleGalleryMouseDown = createDragScrollHandler({ snapToSlide: true })

const currentHash = ref(typeof window !== 'undefined' ? window.location.hash : '')

const vehicle = computed(() => {
  const queryStr = currentHash.value.includes('?') ? currentHash.value.split('?')[1] : ''
  const idParam = Number(new URLSearchParams(queryStr).get('id'))
  return stockVehicles.value.find((v) => v.id === idParam) || stockVehicles.value[0]
})

const isScrolled = ref(false)
const hasPassedEnquire = ref(false)
const topSectionRef = ref(null)
const activeIndex = ref(0)
const mainTrackRef = ref(null)
let scrollContainer = null

function syncHash() {
  currentHash.value = window.location.hash
}

watch(
  () => vehicle.value.id,
  () => {
    activeIndex.value = 0
    if (mainTrackRef.value) {
      mainTrackRef.value.scrollLeft = 0
    }
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    isScrolled.value = false
    hasPassedEnquire.value = false
  }
)

function updateScrollState() {
  const containerScroll = scrollContainer ? scrollContainer.scrollTop : 0
  isScrolled.value = window.scrollY > 10 || containerScroll > 10

  const enquireEl = document.getElementById('vdp-enquire')
  if (enquireEl) {
    const headerBottom = topSectionRef.value?.getBoundingClientRect().bottom ?? 160
    hasPassedEnquire.value = enquireEl.getBoundingClientRect().bottom <= headerBottom
  } else {
    hasPassedEnquire.value = false
  }
}

onMounted(() => {
  scrollContainer = topSectionRef.value?.closest('[data-device]') || null
  if (scrollContainer) {
    scrollContainer.scrollTop = 0
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
  isScrolled.value = false
  hasPassedEnquire.value = false
  window.addEventListener('hashchange', syncHash)
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', updateScrollState, { passive: true })
  scrollContainer?.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncHash)
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', updateScrollState)
  scrollContainer?.removeEventListener('scroll', updateScrollState)
})

function selectPhoto(idx) {
  activeIndex.value = idx
  const track = mainTrackRef.value
  if (!track) return
  track.scrollTo({
    left: idx * track.clientWidth,
    behavior: 'smooth',
  })
}

function handleMainScroll(event) {
  const el = event.target
  if (!el || !el.clientWidth) return
  activeIndex.value = Math.round(el.scrollLeft / el.clientWidth)
}

function scrollToEnquire() {
  document.getElementById('vdp-enquire')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToCalculator() {
  document.getElementById('vdp-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="w-full">
    <!-- Full-Width Sticky Top Section (White at rest, Navbar colour edge-to-edge on scroll) -->
    <div
      ref="topSectionRef"
      class="sticky top-0 z-40 w-full transition-colors duration-200"
      :class="isScrolled ? 'border-b border-white/10 shadow-md' : 'bg-white'"
      :style="isScrolled ? { backgroundColor: chromeBg } : undefined"
    >
      <div
        class="mx-auto pt-5 pb-4 space-y-4"
        :class="
          activeDevice === 'mobile'
            ? 'max-w-md px-[10px]'
            : 'max-w-md md:max-w-[1600px] px-[10px] md:px-10 lg:py-3 lg:space-y-[28px]'
        "
      >
        <!-- Top Bar: Browse vehicles + Favorite Heart -->
        <div class="flex items-center justify-between">
          <a
            href="#showroom"
            class="inline-flex items-center gap-2 text-xs font-medium hover:underline transition-colors"
            :class="isScrolled ? 'text-[#2FA6F3]' : 'text-[#0072BC]'"
          >
            <span
              class="w-7 h-7 rounded-full border flex items-center justify-center transition-colors"
              :class="isScrolled ? 'border-white/70 text-white' : 'border-neutral-400 text-neutral-700'"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span>Browse vehicles</span>
          </a>

          <button
            type="button"
            aria-label="Save vehicle"
            class="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            :class="
              isFavorite(vehicle.id)
                ? 'bg-[#D92D20] text-white'
                : isScrolled
                  ? 'border border-white/70 text-white'
                  : 'border border-neutral-800 text-neutral-800'
            "
            @click="toggleFavorite(vehicle.id)"
          >
            <svg
              class="w-4 h-4"
              :class="isFavorite(vehicle.id) ? 'fill-current' : 'fill-none stroke-current'"
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

        <!-- Summary Row: Stacked on Mobile, Horizontal Bar on Desktop -->
        <div
          :class="
            activeDevice === 'mobile'
              ? 'space-y-4'
              : 'space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-8'
          "
        >
          <!-- Price & Est. Payment Split -->
          <div class="flex items-center justify-start gap-[10px] shrink-0">
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 mb-1">
                <span
                  class="text-xs transition-colors"
                  :class="isScrolled ? 'text-white' : 'text-neutral-500'"
                >
                  Price
                </span>
                <VehicleBadges
                  inline
                  :condition="vehicle.condition"
                  :fuel-type="vehicle.fuelType"
                />
              </div>
              <div
                class="text-[42px] font-semibold leading-none whitespace-nowrap transition-colors"
                :class="isScrolled ? 'text-[#2FA6F3]' : 'text-[#0072BC]'"
              >
                {{ vehicle.price }}
              </div>
            </div>

            <div
              class="shrink-0 border-l pl-[10px] space-y-1 transition-colors"
              :class="isScrolled ? 'border-white/70' : 'border-[#969696]'"
            >
              <div
                class="text-[13px] transition-colors"
                :class="isScrolled ? 'text-white' : 'text-neutral-500'"
              >
                Est. Payment
              </div>
              <div
                class="text-[14px] font-medium flex items-center gap-1 transition-colors"
                :class="isScrolled ? 'text-white' : 'text-neutral-800'"
              >
                <span>{{ vehicle.estPayment }}</span>
                <span
                  class="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border text-[9px] transition-colors"
                  :class="isScrolled ? 'border-white/80 text-white' : 'border-neutral-400 text-neutral-500'"
                >
                  i
                </span>
              </div>
            </div>
          </div>

          <!-- Title & Trim -->
          <div class="min-w-0 lg:flex-1">
            <h1
              class="font-poppins font-medium uppercase transition-colors flex items-center gap-2"
              :class="isScrolled ? 'text-[#2FA6F3]' : 'text-[#0072BC]'"
              style="font-size: 24px; line-height: 1.2; font-weight: 500;"
            >
              <span>{{ vehicle.name }}</span>
              <img
                v-if="vehicle.fuelType === 'Hybrid'"
                :src="hybridHevIcon"
                alt="Hybrid"
                class="w-5 h-5 shrink-0"
              />
              <img
                v-else-if="vehicle.fuelType === 'Electric'"
                :src="electricIcon"
                alt="Electric"
                class="w-5 h-5 shrink-0"
              />
            </h1>
            <p
              class="text-xs uppercase mt-1 transition-colors"
              :class="isScrolled ? 'text-white' : 'text-neutral-500'"
              style="font-size: 12px;"
            >
              {{ vehicle.trim }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div
            class="grid grid-cols-3 gap-2"
            :class="activeDevice === 'mobile' ? '' : 'lg:flex lg:items-center lg:justify-end lg:gap-2 lg:shrink-0'"
          >
            <button
              type="button"
              class="rounded-full border py-2.5 px-2.5 flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-200 hover:bg-[#0072BC] hover:border-[#0072BC] hover:text-white cursor-pointer"
              :class="[
                activeDevice === 'mobile' ? 'text-xs' : 'text-xs sm:text-sm lg:w-[116px]',
                isScrolled
                  ? 'border-white text-white'
                  : 'border-neutral-800 text-neutral-800',
              ]"
              @click="scrollToCalculator"
            >
              Finance
            </button>
            <button
              type="button"
              class="rounded-full py-2.5 px-2.5 flex items-center justify-center whitespace-nowrap font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
              :class="activeDevice === 'mobile' ? 'text-xs' : 'text-xs sm:text-sm lg:w-[116px]'"
              @click="scrollToEnquire"
            >
              Enquire
            </button>
            <a
              href="https://wa.me/27105934429"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full py-2.5 px-2.5 flex items-center justify-center gap-1.5 whitespace-nowrap font-medium text-white bg-[#34C759] hover:bg-[#2eb850] shadow-sm transition-all duration-300 ease-out cursor-pointer"
              :class="
                activeDevice === 'mobile'
                  ? 'text-xs'
                  : [
                      'text-xs sm:text-sm',
                      hasPassedEnquire
                        ? 'lg:w-[132px] lg:px-3 lg:opacity-100 lg:scale-100'
                        : 'lg:w-0 lg:px-0 lg:opacity-0 lg:scale-95 lg:pointer-events-none lg:overflow-hidden lg:-ml-2',
                    ]
              "
              :tabindex="activeDevice !== 'mobile' && !hasPassedEnquire ? -1 : undefined"
              :aria-hidden="activeDevice !== 'mobile' && !hasPassedEnquire ? 'true' : undefined"
            >
              <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.04 2a9.9 9.9 0 0 0-8.52 14.95L2 22l5.2-1.48A9.92 9.92 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.88.88-3-.2-.31A8.2 8.2 0 1 1 12.04 20.1zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.75 6.75 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.33.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.29z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Page Content Constrained to 1600px -->
    <div
      class="mx-auto max-w-[1600px] pt-4 pb-6"
      :class="activeDevice === 'mobile' ? 'px-[10px]' : 'px-[10px] md:px-10 lg:pt-5 lg:pb-8'"
    >
      <div
        class="mx-auto space-y-5"
        :class="activeDevice === 'mobile' ? 'max-w-md' : 'max-w-md md:max-w-none lg:space-y-8'"
      >
        <!-- Main VDP Grid (Stacked on Mobile, Equal-Height 6/6 Top Row + 8/4 Details Row on Desktop) -->
        <div
          :class="
            activeDevice === 'mobile'
              ? 'space-y-5'
              : 'space-y-5 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10 lg:space-y-0'
          "
        >
          <!-- Row 1 Left: Main Scrollable Gallery -->
          <div
            class="space-y-2.5"
            :class="activeDevice === 'mobile' ? '' : 'lg:col-start-1 lg:col-span-6 lg:row-start-1'"
          >
            <div
              class="relative aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100"
              :class="activeDevice === 'mobile' ? '' : 'lg:aspect-[4/3] lg:max-h-[calc(100vh-320px)]'"
            >
              <div
                ref="mainTrackRef"
                class="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none"
                style="scrollbar-width: none;"
                @scroll="handleMainScroll"
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
                  :class="activeDevice === 'mobile' ? '' : 'lg:object-contain'"
                />
              </div>
            </div>

            <!-- Thumbnail Strip -->
            <div
              class="flex items-center gap-2 overflow-x-auto pb-1"
              style="scrollbar-width: none;"
            >
              <button
                v-for="(img, idx) in vehicle.images"
                :key="idx"
                type="button"
                class="shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer"
                :class="[
                  activeDevice === 'mobile' ? '' : 'md:w-24 md:h-16',
                  activeIndex === idx ? 'border-[#0072BC]' : 'border-transparent opacity-75 hover:opacity-100',
                ]"
                @click="selectPhoto(idx)"
              >
                <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>

            <!-- Pagination Dots -->
            <div class="flex items-center justify-center gap-1.5">
              <button
                v-for="(_, idx) in vehicle.images"
                :key="idx"
                type="button"
                :aria-label="`Select photo ${idx + 1}`"
                class="w-2 h-2 rounded-full transition-colors cursor-pointer"
                :class="activeIndex === idx ? 'bg-[#0072BC]' : 'bg-neutral-300'"
                @click="selectPhoto(idx)"
              ></button>
            </div>
          </div>

          <!-- Row 2 Full Width: Vehicle Description -->
          <section
            class="!my-0 pt-2 space-y-3"
            :class="activeDevice === 'mobile' ? '' : 'lg:col-span-12 lg:row-start-2'"
          >
            <h2>Vehicle Description</h2>
            <p class="text-sm text-neutral-700 leading-relaxed" style="color: #404040;">
              {{ vehicle.description }}
            </p>
          </section>

          <!-- Row 3 Left: Overview -->
          <div :class="activeDevice === 'mobile' ? '' : 'lg:col-start-1 lg:col-span-6 lg:row-start-3'">
            <VehicleOverview
              :mileage="vehicle.mileage"
              :exterior-colour="vehicle.exteriorColour"
              :body-type="vehicle.bodyType"
              :transmission="vehicle.transmission"
              :engine-size="vehicle.engineSize"
              :fuel-type="vehicle.fuelType"
            />
          </div>

          <!-- Row 3 Right: Additional Specifications (Next to Overview on Desktop) -->
          <div :class="activeDevice === 'mobile' ? '' : 'lg:col-start-7 lg:col-span-6 lg:row-start-3'">
            <VehicleSpecifications
              :fuel-type="vehicle.fuelType"
              :specifications="vehicle.specifications"
            />
          </div>

          <!-- Row 4 Full Width: Specs Note -->
          <div
            class="space-y-3 text-xs leading-relaxed text-neutral-600"
            :class="activeDevice === 'mobile' ? 'pb-4' : 'pb-4 lg:pb-0 lg:col-span-12 lg:row-start-4'"
          >
            <div>
              <div class="font-semibold text-[#004A87] mb-1">Please note:</div>
              <p>
                The data displayed above are manufacturer specs for New vehicles and do not reflect the current condition of a used vehicle which may differ from the one being offered for sale. We recommend that you always check the details with the seller prior to purchase.
              </p>
            </div>
            <p v-if="vehicle.fuelType === 'Electric'">
              ** Real world range and energy consumption averages may vary according to factors such as driving styles, environmental conditions, load, wheel and tyre fitment, accessories and options fitted.
            </p>
            <p v-else>
              ** Real world fuel consumption averages may vary according to factors such as driving styles, environmental conditions, load, wheel and tyre fitment, accessories and options fitted.
            </p>
          </div>

          <!-- Mobile-only Divider -->
          <div :class="activeDevice === 'mobile' ? 'block' : 'block lg:hidden'">
            <SupergroupDivider />
          </div>

          <!-- Row 1 Right: Enquire Section (matches Gallery height on Desktop) -->
          <div :class="activeDevice === 'mobile' ? '' : 'lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:h-full'">
            <VehicleEnquire />
          </div>
        </div>

        <!-- Divider -->
        <SupergroupDivider />

        <!-- Finance Calculator Section -->
        <section id="vdp-calculator" class="!my-0 pt-2 pb-4 scroll-mt-56">
          <FinanceCalculator
            :key="vehicle.id"
            :vehicle="vehicle"
            :closable="false"
            show-intro
          />
        </section>

        <!-- Divider -->
        <SupergroupDivider />

        <!-- Dealership Location Section (2-Column Reference Layout on Desktop) -->
        <DealerLocation
          :dealer-name="vehicle.dealer"
          :address="vehicle.address"
          :phone="vehicle.phone"
        />

        <!-- Divider -->
        <SupergroupDivider />

        <!-- More Listings From This Dealer -->
        <MoreFromDealer :dealer-name="vehicle.dealer" :exclude-id="vehicle.id" />

        <!-- Divider -->
        <SupergroupDivider />

        <!-- Similar Vehicles -->
        <SimilarVehicles
          :body-type="vehicle.bodyType"
          :make="vehicle.make"
          :exclude-id="vehicle.id"
        />
      </div>
    </div>
  </div>
</template>
