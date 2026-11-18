<script setup>
import supergroupLogo from '../../images/supergroup-dealerships-mobile-logo.webp'
import bbbeeLogo from '../../images/supergroup-dealership-bbbee-level-2-logo-footer.png'

const quicklinks = [
  { label: 'Showroom', href: '#showroom' },
  { label: 'Sell Your Car', href: '#sell-your-car' },
  { label: 'Value Added Products', href: '#value-added-products' },
  { label: 'Careers', href: '#careers' },
  { label: 'Explore Charging Station', href: '#charging-station' },
]
</script>

<template>
  <footer class="mx-auto max-w-[1400px] px-[20px] pb-6 pt-4">
    <div class="rounded-[28px] bg-[#1C1C1E] text-neutral-300 px-6 py-8 md:px-10 md:py-12">
      <!-- Centered Supergroup Logo -->
      <div class="flex justify-center mb-8">
        <a href="#" aria-label="Supergroup Dealerships Home">
          <img
            :src="supergroupLogo"
            alt="Supergroup Dealerships"
            class="h-14 w-auto"
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
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
              </svg>
            </a>
            <a href="#instagram" aria-label="Instagram" class="hover:text-[#0072BC] transition-colors">
              <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#youtube" aria-label="YouTube" class="hover:text-[#0072BC] transition-colors">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.94C17.93 4.8 12 4.8 12 4.8s-5.93 0-7.64.45a2.75 2.75 0 0 0-1.94 1.94A28.7 28.7 0 0 0 2 12a28.7 28.7 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.94c1.71.45 7.64.45 7.64.45s5.93 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.94A28.7 28.7 0 0 0 22 12a28.7 28.7 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
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

      <!-- Centered BBBEE Badge -->
      <div class="flex justify-center my-8">
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
