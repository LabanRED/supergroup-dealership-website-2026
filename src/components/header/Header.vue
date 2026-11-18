<script setup>
import { ref } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import mobileLogo from '../../images/supergroup-dealerships-mobile-logo.webp'
import desktopLogo from '../../images/supergroup-dealerships-desktop-logo.webp'
import showroomMobileIcon from '../../images/supergroup-dealerships-showroom-mobile-icon.svg'
import burgerMenuIcon from '../../images/burger-menu-icon.svg'

const { activeDevice, setDevice, isLocal } = useDevicePreview()

const servicesOpen = ref(false)
const mobileMenuOpen = ref(false)

const serviceLinks = [
  { label: 'Unified inbox', href: '#unified-inbox' },
  { label: 'Posting', href: '#posting' },
  { label: 'Frames', href: '#frames' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'LiveChat AI', href: '#livechat-ai' },
]

const deviceModes = [
  { id: 'auto', label: 'Auto' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'mobile', label: 'Mobile' },
]

function closeMenus() {
  servicesOpen.value = false
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 shrink-0">
    <div
      class="w-full max-w-full overflow-x-auto overflow-y-hidden bg-white"
      :class="activeDevice === 'mobile' ? 'md:rounded-t-[28px]' : ''"
      style="scrollbar-width: none;"
    >
      <iframe
        _ngcontent-c5=""
        class="block h-[22px] border-0"
        :class="activeDevice === 'mobile' ? 'w-[620px]' : 'w-[620px] md:w-full'"
        src="https://irhosted.profiledata.co.za/supergroup/2018_feeds/t02_intraday.htm"
        style="background-color: #ffffff;"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
    <div
      class="mx-auto h-20 lg:h-24 bg-black border border-white/10 shadow-2xl px-5 md:px-10 flex items-center justify-between gap-4 relative"
    >
      <!-- Mobile Menu Button (Left on mobile) -->
      <button
        type="button"
        class="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        :class="activeDevice === 'mobile' ? 'inline-flex' : 'inline-flex md:hidden'"
        aria-label="Toggle menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <img
          v-if="!mobileMenuOpen"
          :src="burgerMenuIcon"
          alt=""
          class="w-[27px] h-[20px]"
        />
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Brand Logo (Centered on mobile, Left on desktop) -->
      <a
        href="#"
        class="flex items-center shrink-0"
        :class="
          activeDevice === 'mobile'
            ? 'mx-auto'
            : 'mx-auto md:mx-0'
        "
        aria-label="Supergroup Dealerships Home"
        @click="closeMenus"
      >
        <img
          :src="mobileLogo"
          alt="Supergroup Dealerships"
          class="h-12 w-auto"
          :class="activeDevice === 'mobile' ? 'block' : 'block md:hidden'"
        />
        <img
          :src="desktopLogo"
          alt="Supergroup Dealerships"
          class="h-9 lg:h-11 w-auto"
          :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:block'"
        />
      </a>

      <!-- Mobile Showroom Icon (Right on mobile) -->
      <a
        href="#contact"
        class="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
        :class="activeDevice === 'mobile' ? 'inline-flex' : 'inline-flex md:hidden'"
        aria-label="Showrooms"
        @click="closeMenus"
      >
        <img :src="showroomMobileIcon" alt="Showrooms" class="w-[27px] h-[24px]" />
      </a>

      <!-- Desktop Navigation -->
      <nav
        class="items-center gap-8 text-sm font-medium text-neutral-300"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:flex'"
      >
        <!-- Services Dropdown -->
        <div
          class="relative"
          @mouseenter="servicesOpen = true"
          @mouseleave="servicesOpen = false"
        >
          <button
            type="button"
            class="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors py-2 cursor-pointer"
            @click="servicesOpen = !servicesOpen"
          >
            <span>Services</span>
            <svg
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': servicesOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            v-show="servicesOpen"
            class="absolute left-0 top-full pt-2 w-52"
          >
            <div class="rounded-2xl bg-neutral-950 border border-white/10 shadow-2xl py-2 overflow-hidden">
              <a
                v-for="item in serviceLinks"
                :key="item.href"
                :href="item.href"
                class="block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                @click="closeMenus"
              >
                {{ item.label }}
              </a>
            </div>
          </div>
        </div>

        <a href="#blogs" class="hover:text-white transition-colors" @click="closeMenus">
          Blogs
        </a>
        <a href="#about" class="hover:text-white transition-colors" @click="closeMenus">
          About
        </a>
      </nav>

      <!-- Right Controls: Local Device Switcher + Primary CTA -->
      <div
        class="items-center gap-3 shrink-0"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden md:flex'"
      >
        <!-- Local-only Device Preview Switcher -->
        <div
          v-if="isLocal"
          class="hidden lg:flex items-center gap-1 bg-white/10 rounded-full p-1"
          title="Local device preview"
        >
          <button
            v-for="mode in deviceModes"
            :key="mode.id"
            type="button"
            class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer"
            :class="
              activeDevice === mode.id
                ? 'bg-[#00A5C5] text-white'
                : 'text-neutral-300 hover:text-white'
            "
            @click="setDevice(mode.id)"
          >
            {{ mode.label }}
          </button>
        </div>

        <!-- Primary CTA -->
        <a
          href="#contact"
          class="btn btn-secondary text-xs md:text-sm"
          @click="closeMenus"
        >
          Book a Demo
        </a>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="mx-auto max-w-[1600px] mt-2 rounded-3xl bg-black border border-white/10 shadow-2xl p-6 text-neutral-300 space-y-4"
      :class="activeDevice === 'mobile' ? 'block' : 'block md:hidden'"
    >
      <div>
        <div class="text-xs uppercase tracking-wider text-neutral-500 mb-2">Services</div>
        <div class="grid grid-cols-1 gap-1.5 pl-2">
          <a
            v-for="item in serviceLinks"
            :key="item.href"
            :href="item.href"
            class="py-1.5 text-sm text-neutral-300 hover:text-white"
            @click="closeMenus"
          >
            {{ item.label }}
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 pt-3 flex flex-col gap-2">
        <a href="#blogs" class="py-1.5 text-sm hover:text-white" @click="closeMenus">Blogs</a>
        <a href="#about" class="py-1.5 text-sm hover:text-white" @click="closeMenus">About</a>
      </div>

      <div v-if="isLocal" class="border-t border-white/10 pt-3">
        <div class="text-xs uppercase tracking-wider text-neutral-500 mb-2">Device Preview</div>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="mode in deviceModes"
            :key="mode.id"
            type="button"
            class="px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
            :class="
              activeDevice === mode.id
                ? 'bg-[#00A5C5] text-white'
                : 'bg-white/10 text-neutral-300'
            "
            @click="setDevice(mode.id)"
          >
            {{ mode.label }}
          </button>
        </div>
      </div>

      <div class="pt-2">
        <a href="#contact" class="btn btn-secondary w-full" @click="closeMenus">
          Book a Demo
        </a>
      </div>
    </div>
  </header>
</template>
