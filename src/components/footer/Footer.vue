<script setup>
const serviceLinks = [
  { label: 'Unified inbox', href: '#unified-inbox' },
  { label: 'Posting', href: '#posting' },
  { label: 'Frames', href: '#frames' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'LiveChat AI', href: '#livechat-ai' },
]

const companyLinks = [
  { label: 'About', href: '#about' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <footer class="bg-black text-neutral-300 mt-16 border-t border-white/10">
    <div class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-14">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div class="md:col-span-2 space-y-4">
          <a href="#" class="inline-flex items-center gap-2.5 text-white font-semibold text-2xl tracking-tight">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#00A5C5] text-black font-bold text-base">
              PX
            </span>
            <span>Post<span class="text-[#00A5C5]">X</span></span>
          </a>
          <p class="text-sm text-neutral-400 max-w-md" style="color: #a3a3a3;">
            Proprietary social media, review management, and AI-powered customer experience built for modern automotive dealer groups and OEM networks.
          </p>
        </div>

        <div>
          <h3 class="text-white font-medium text-sm uppercase tracking-wider mb-4">Services</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="item in serviceLinks" :key="item.href">
              <a :href="item.href" class="text-neutral-400 hover:text-white transition-colors">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-medium text-sm uppercase tracking-wider mb-4">Company</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="item in companyLinks" :key="item.href">
              <a :href="item.href" class="text-neutral-400 hover:text-white transition-colors">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <span>© 2026 PostX. All rights reserved.</span>
        <span>Built for automotive excellence.</span>
      </div>
    </div>
  </footer>
</template>
