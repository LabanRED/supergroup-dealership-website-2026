<script setup>
import { useDevicePreview } from '../../composables/useDevicePreview.js'
import { useChromeTheme } from '../../composables/useChromeTheme.js'
import supergroupLogo from '../../images/supergroup-dealerships-mobile-logo.webp'
import bbbeeLogo from '../../images/supergroup-dealership-bbbee-level-2-logo-footer.png'

const { activeDevice } = useDevicePreview()
const {
  chromeBg: footerBg,
  onTouchStart: onFooterTouchStart,
  onTouchEnd: onFooterTouchEnd,
  onMouseDown: onFooterMouseDown,
  onMouseUp: onFooterMouseUp,
} = useChromeTheme()

const quicklinks = [
  { label: 'Showroom', href: '#showroom' },
  { label: 'Sell Your Car', href: '#sell-your-car' },
  { label: 'Value Added Products', href: '#value-added-products' },
  { label: 'Careers', href: '#careers' },
  { label: 'Explore Charging Station', href: '#charging-station' },
]
</script>

<template>
  <footer
    class="w-full"
    :class="activeDevice === 'mobile' ? 'mx-auto max-w-[1600px] px-[10px] pb-6 pt-4' : 'px-[10px] pb-6 pt-4 lg:p-[20px]'"
  >
    <div
      class="rounded-[28px] text-neutral-300 transition-colors duration-200 select-none"
      :class="
        activeDevice === 'mobile'
          ? 'px-6 py-8'
          : 'px-6 py-8 lg:px-16 xl:px-24 lg:py-14'
      "
      :style="{ backgroundColor: footerBg }"
      @touchstart.passive="onFooterTouchStart"
      @touchend.passive="onFooterTouchEnd"
      @mousedown="onFooterMouseDown"
      @mouseup="onFooterMouseUp"
    >
      <!-- Mobile Layout -->
      <div :class="activeDevice === 'mobile' ? 'block' : 'block lg:hidden'">
        <!-- Centered Supergroup Logo -->
        <div class="flex justify-center mb-8">
          <a href="#" aria-label="Supergroup Dealerships Home">
            <img
              :src="supergroupLogo"
              alt="Supergroup Dealerships"
              class="h-24 w-auto"
            />
          </a>
        </div>

        <!-- 2-Column Content Grid -->
        <div class="grid grid-cols-2 gap-x-6 gap-y-8">
          <!-- About Copy -->
          <div>
            <p class="text-xs leading-relaxed" style="color: #d4d4d4; font-size: 12px;">
              Super Group Dealerships proudly stands among South Africa's premier automotive retail networks, representing 36 distinguished brands through a nationwide footprint of 75 dealerships.
            </p>
          </div>

          <!-- Quicklinks -->
          <div>
            <h3 class="text-white font-semibold text-sm mb-3">Quicklinks</h3>
            <ul class="space-y-2.5 text-xs text-neutral-300">
              <li v-for="item in quicklinks" :key="item.label">
                <a :href="item.href" class="hover:text-white transition-colors">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Additional & Socials -->
          <div>
            <h3 class="text-white font-semibold text-sm mb-3">Additional</h3>
            <ul class="space-y-2.5 text-xs text-neutral-300">
              <li>
                <a href="#about" class="hover:text-white transition-colors">About Us</a>
              </li>
            </ul>

            <h3 class="text-white font-semibold text-sm mt-6 mb-3">Our Socials</h3>
            <div class="flex items-center gap-4 text-white">
              <a href="#facebook" aria-label="Facebook" class="hover:text-[#0072BC] transition-colors">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Get In Touch -->
          <div>
            <h3 class="text-white font-semibold text-sm mb-3">Get In Touch</h3>
            <div class="space-y-2.5 text-xs text-neutral-300">
              <div>
                <a href="#contact" class="hover:text-white transition-colors">Find a Dealer</a>
              </div>
              <div class="break-all">
                <a href="mailto:info.dealerships@supergrp.com" class="hover:text-white transition-colors">
                  info.dealerships@supergrp.com
                </a>
              </div>
              <p class="leading-relaxed" style="color: #d4d4d4; font-size: 12px;">
                Super Group Park, 27 Impala Road Chislehurston, Sandton, 2196
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop 4-Column Layout -->
      <div
        class="grid-cols-[1.3fr_1fr_1.1fr_0.8fr] gap-12 items-start"
        :class="activeDevice === 'mobile' ? 'hidden' : 'hidden lg:grid'"
      >
        <!-- Column 1: Logo + About + Socials -->
        <div class="space-y-6">
          <a href="#" aria-label="Supergroup Dealerships Home" class="inline-block">
            <img
              :src="supergroupLogo"
              alt="Supergroup Dealerships"
              class="h-24 w-auto"
            />
          </a>

          <p class="text-xs leading-relaxed max-w-xs" style="color: #d4d4d4; font-size: 13px;">
            Super Group Dealerships proudly stands among South Africa's premier automotive retail networks, representing 36 distinguished brands through a nationwide footprint of 75 dealerships.
          </p>

          <div>
            <h3 class="text-white font-semibold text-sm mb-3">Our Socials</h3>
            <div class="flex items-center gap-4 text-white">
              <a href="#facebook" aria-label="Facebook" class="hover:text-[#2FA6F3] transition-colors">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
              <a href="#instagram" aria-label="Instagram" class="hover:text-[#2FA6F3] transition-colors">
                <svg class="w-5 h-5 fill-none stroke-current" stroke-width="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#youtube" aria-label="YouTube" class="hover:text-[#2FA6F3] transition-colors">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8s-.1-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Column 2: Quicklinks -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-5">Quicklinks</h3>
          <ul class="space-y-3.5 text-sm text-neutral-300">
            <li v-for="item in quicklinks" :key="item.label">
              <a :href="item.href" class="hover:text-white transition-colors">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Get In Touch -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-5">Get In Touch</h3>
          <div class="space-y-3.5 text-sm text-neutral-300">
            <div>
              <a href="#contact" class="hover:text-white transition-colors">Find a Dealer</a>
            </div>
            <div>
              <a href="mailto:info.dealerships@supergrp.com" class="hover:text-white transition-colors">
                info.dealerships@supergrp.com
              </a>
            </div>
            <p class="leading-relaxed max-w-xs" style="color: #d4d4d4; font-size: 13px;">
              Super Group Park, 27 Impala Road<br />Chislehurston, Sandton, 2196
            </p>
          </div>
        </div>

        <!-- Column 4: Additional -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-5">Additional</h3>
          <ul class="space-y-3.5 text-sm text-neutral-300">
            <li>
              <a href="#about" class="hover:text-white transition-colors">About Us</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Centered BBBEE Badge -->
      <div class="flex justify-center my-8 lg:my-10">
        <img
          :src="bbbeeLogo"
          alt="Level 2 BBBEE"
          class="h-24 w-auto"
        />
      </div>

      <!-- Legal & Copyright -->
      <p class="text-center leading-relaxed" style="color: #a3a3a3; font-size: 12px;">
        Copyright Supergroup Dealerships 2026. All rights reserved.
        <a href="#privacy" class="hover:text-white transition-colors">Privacy Policy</a>
        |
        <a href="#legal" class="hover:text-white transition-colors">Legal and Disclaimer</a>
      </p>
    </div>
  </footer>
</template>
