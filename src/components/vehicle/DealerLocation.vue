<script setup>
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import dealerImage from '../../images/suzuki-dealer-image.webp'

const { activeDevice } = useDevicePreview()

const props = defineProps({
  dealerName: {
    type: String,
    default: 'Suzuki Edenvale',
  },
  address: {
    type: String,
    default: 'Cnr K90 and Bentel Road 145',
  },
  phone: {
    type: String,
    default: '010 593 4429',
  },
})

function scrollToEnquire() {
  document.getElementById('vdp-enquire')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    class="!my-0 pt-2 pb-6"
    :class="
      activeDevice === 'mobile'
        ? 'space-y-4'
        : 'space-y-4 lg:space-y-0 lg:pt-[38px] lg:pb-[54px] lg:grid lg:grid-cols-12 lg:gap-10 lg:items-stretch'
    "
  >
    <!-- Left Column: Heading, Copy, and Dealer Info Card -->
    <div
      class="space-y-4"
      :class="activeDevice === 'mobile' ? '' : 'lg:col-span-7 lg:space-y-5'"
    >
      <h2>Dealership Location</h2>

      <p class="text-sm text-neutral-700 leading-relaxed" style="color: #404040;">
        Our dealership offers the full suite of automotive services, so we are equipped to sell new and pre-owned vehicles, service and repair vehicles, and assist customers with financing and insuring vehicles.
      </p>

      <div
        class="rounded-[24px] border border-[#9BB6D3] bg-white p-6 text-center space-y-4"
        :class="
          activeDevice === 'mobile'
            ? ''
            : 'lg:text-left lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-6'
        "
      >
        <div class="space-y-3 min-w-0">
          <h3 class="text-xl font-medium text-[#004A87]">{{ dealerName }}</h3>

          <div class="space-y-2.5 text-xs text-neutral-700">
            <div
              class="flex items-center justify-center gap-2"
              :class="activeDevice === 'mobile' ? '' : 'lg:justify-start'"
            >
              <svg class="w-4 h-4 text-[#0072BC] fill-none stroke-current shrink-0" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
              <span>{{ address }}</span>
            </div>

            <div
              class="flex items-center justify-center gap-2"
              :class="activeDevice === 'mobile' ? '' : 'lg:justify-start'"
            >
              <svg class="w-4 h-4 text-[#0072BC] fill-none stroke-current shrink-0" stroke-width="1.8" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              <a :href="`tel:${phone.replace(/\s+/g, '')}`" class="hover:underline">
                {{ phone }}
              </a>
            </div>

            <div
              class="space-y-1"
              :class="activeDevice === 'mobile' ? '' : 'lg:space-y-0 lg:flex lg:items-center lg:gap-3 lg:flex-wrap'"
            >
              <div
                class="flex items-center justify-center gap-2"
                :class="activeDevice === 'mobile' ? '' : 'lg:justify-start'"
              >
                <svg class="w-4 h-4 text-[#0072BC] fill-none stroke-current shrink-0" stroke-width="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 2" />
                </svg>
                <span>Mon - Fri: &nbsp;7:30 am – 5:30 pm</span>
              </div>
              <div>Sat: &nbsp;7:30 am – 5:30 pm</div>
            </div>
          </div>
        </div>

        <div
          class="space-y-3 pt-2"
          :class="activeDevice === 'mobile' ? '' : 'lg:pt-0 lg:w-[210px] lg:shrink-0 lg:space-y-2.5'"
        >
          <a
            href="https://maps.google.com/?q=Suzuki+Edenvale"
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full rounded-full py-3 px-6 text-center text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity"
          >
            Directions
          </a>

          <button
            type="button"
            class="block w-full rounded-full py-3 px-6 text-center text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            @click="scrollToEnquire"
          >
            Contact Dealer
          </button>
        </div>
      </div>
    </div>

    <!-- Right Column (Desktop Only): Dealership Exterior Image matched to left column height -->
    <div
      class="relative overflow-hidden rounded-[24px] bg-neutral-100"
      :class="activeDevice === 'mobile' ? 'hidden' : 'hidden lg:block lg:col-span-5 lg:min-h-[260px]'"
    >
      <img
        :src="dealerImage"
        :alt="`${dealerName} dealership exterior`"
        class="lg:absolute lg:inset-0 w-full h-full object-cover"
      />
    </div>
  </section>
</template>
