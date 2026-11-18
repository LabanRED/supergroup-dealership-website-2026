<script setup>
import { ref } from 'vue'

defineProps({
  sectionId: {
    type: String,
    default: 'vdp-enquire',
  },
  vehicleName: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const fullName = ref('')
const phone = ref('')
const email = ref('')
const enquiryType = ref('Interest')
const optIn = ref(false)
const submitted = ref(false)

function handleSubmit() {
  if (!fullName.value.trim() || !phone.value.trim() || !email.value.trim()) return
  submitted.value = true
}
</script>

<template>
  <section :id="sectionId" class="!my-0 pt-2 pb-6">
    <div class="rounded-[28px] border border-neutral-300 bg-white p-6 space-y-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-2xl font-medium text-[#004A87] mb-1">Enquire Now</h3>
          <p v-if="vehicleName" class="text-xs font-medium text-neutral-600 mb-1">
            {{ vehicleName }}
          </p>
          <p class="text-xs leading-relaxed" style="color: #004A87; font-size: 13px;">
            A member of our sales team will be in touch soon regarding your enquiry.
          </p>
        </div>

        <button
          v-if="closable"
          type="button"
          aria-label="Close enquiry form"
          class="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          @click="emit('close')"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Call & WhatsApp Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <a
          href="tel:0105934429"
          class="inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-3 text-xs font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity"
        >
          <svg class="w-4 h-4 fill-none stroke-current shrink-0" stroke-width="2" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"
            />
          </svg>
          <span>Call us today</span>
        </a>

        <a
          href="https://wa.me/27105934429"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-3 text-xs font-medium text-white bg-[#34C759] hover:bg-[#2eb850] shadow-sm transition-colors"
        >
          <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.52 14.95L2 22l5.2-1.48A9.92 9.92 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.88.88-3-.2-.31A8.2 8.2 0 1 1 12.04 20.1zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.75 6.75 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.33.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.29z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>

      <!-- Form -->
      <form v-if="!submitted" class="space-y-4" @submit.prevent="handleSubmit">
        <label class="block text-xs font-medium text-[#004A87]">
          Full Name
          <input
            v-model="fullName"
            type="text"
            required
            placeholder="John Henderson"
            class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
          />
        </label>

        <label class="block text-xs font-medium text-[#004A87]">
          Phone Number
          <input
            v-model="phone"
            type="tel"
            required
            placeholder="+27 72 000-0000"
            class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
          />
        </label>

        <label class="block text-xs font-medium text-[#004A87]">
          Email Address
          <input
            v-model="email"
            type="email"
            required
            placeholder="john@example.com"
            class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
          />
        </label>

        <label class="block text-xs font-medium text-[#004A87]">
          Enquiry Type
          <div class="relative mt-1.5">
            <select
              v-model="enquiryType"
              class="w-full appearance-none rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 pr-10 text-sm text-[#004A87] focus:outline-none focus:border-[#0072BC] cursor-pointer"
            >
              <option value="Interest">Interest</option>
              <option value="Book Test Drive">Book Test Drive</option>
              <option value="Trade-In Valuation">Trade-In Valuation</option>
              <option value="Finance Enquiry">Finance Enquiry</option>
            </select>
            <svg
              class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004A87]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </label>

        <button
          type="submit"
          class="w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        >
          Submit
        </button>

        <label class="flex items-center justify-center gap-2 text-[11px] text-[#0072BC] cursor-pointer pt-1">
          <input
            v-model="optIn"
            type="checkbox"
            class="w-4 h-4 rounded-full accent-[#0072BC] cursor-pointer"
          />
          <span>Please send me news, reviews and special offers</span>
        </label>

        <p class="text-center leading-relaxed" style="color: #0072BC; font-size: 11px;">
          By submitting you agree to our
          <a href="#terms" class="font-semibold hover:underline">Terms and Conditions</a>
        </p>
      </form>

      <div v-else class="rounded-2xl bg-[#E5EFF8] p-6 text-center space-y-3">
        <div class="text-base font-semibold text-[#004A87]">Enquiry Sent</div>
        <p class="text-xs text-neutral-700" style="font-size: 12px;">
          Thank you, {{ fullName }}. Our Suzuki Edenvale sales team will contact you shortly.
        </p>
        <button
          type="button"
          class="rounded-full border border-[#0072BC] px-5 py-2 text-xs font-medium text-[#0072BC] hover:bg-[#0072BC] hover:text-white transition-colors cursor-pointer"
          @click="submitted = false"
        >
          Send another enquiry
        </button>
      </div>
    </div>
  </section>
</template>
