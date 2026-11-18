<script setup>
import { ref, computed } from 'vue'
import { useDevicePreview } from '../composables/useDevicePreview.js'

const { activeDevice } = useDevicePreview()

const titleOptions = [
  'Advocate',
  'Doctor',
  'Honourable',
  'Miss',
  'Mister',
  'Mrs',
  'Ms',
  'Pastor',
  'Professor',
  'Reverend',
  'Sir',
]

const employmentOptions = ['Employed', 'Self-Employed']

const maritalOptions = [
  'Unmarried',
  'Married',
  'Divorced',
  'Separated',
  'Widowed',
]

const vehicleSummary = computed(() => {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  const queryStr = hash.includes('?') ? hash.split('?')[1] : ''
  const params = new URLSearchParams(queryStr)

  const year = params.get('year') || '2023'
  const make = params.get('make') || 'RENAULT'
  const model = params.get('model') || 'CLIO'
  const variant = params.get('variant') || '1.0T ZEN 5DR (66KW)'
  const dealerName = params.get('dealerName') || 'Suzuki Edenvale'
  const condition = params.get('newused') || 'USED'
  const rawPrice = Number(params.get('price') || 199900)
  const formattedPrice = `R${rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`

  return {
    title: `${year} ${make} ${model}`.toUpperCase(),
    variant: variant.toUpperCase(),
    dealerName,
    condition,
    price: formattedPrice,
  }
})

const title = ref('')
const saId = ref('')
const firstName = ref('')
const lastName = ref('')
const cellphone = ref('')
const email = ref('')
const employmentStatus = ref('')
const maritalStatus = ref('')
const grossIncome = ref('')
const netIncome = ref('')
const totalExpenses = ref('')

const hasDriversLicense = ref(false)
const notUnderDebtReview = ref(false)
const agreeTerms = ref(false)
const consentCreditCheck = ref(false)
const needInsurance = ref(false)

const submitted = ref(false)

function handleSubmit() {
  if (
    !title.value ||
    !saId.value.trim() ||
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !cellphone.value.trim() ||
    !email.value.trim() ||
    !employmentStatus.value ||
    !maritalStatus.value ||
    !grossIncome.value ||
    !netIncome.value ||
    !totalExpenses.value ||
    !hasDriversLicense.value ||
    !notUnderDebtReview.value ||
    !agreeTerms.value ||
    !consentCreditCheck.value
  ) {
    return
  }
  submitted.value = true
}
</script>

<template>
  <div
    class="mx-auto max-w-[1400px] py-6"
    :class="activeDevice === 'mobile' ? 'px-[20px]' : 'px-[20px] md:px-10'"
  >
    <div class="max-w-md mx-auto space-y-5">
      <!-- Back Link -->
      <div>
        <a
          href="#vehicle-detail"
          class="inline-flex items-center gap-2 text-xs font-medium text-[#0072BC] hover:underline"
        >
          <span
            class="w-7 h-7 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-700"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          <span>Back to vehicle</span>
        </a>
      </div>

      <!-- Heading -->
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#004A87]">Finance Pre-Approval</h1>
        <p class="text-xs leading-relaxed text-neutral-600">
          Complete the form below to apply for vehicle finance pre-approval.
        </p>
      </div>

      <!-- Selected Vehicle Summary -->
      <div class="rounded-[24px] border border-neutral-200 bg-[#F4F8FC] p-4 flex items-center justify-between gap-3">
        <div class="min-w-0">
          <div class="text-[11px] uppercase tracking-wide text-[#0072BC] font-medium">
            {{ vehicleSummary.condition }} · {{ vehicleSummary.dealerName }}
          </div>
          <div class="text-sm font-semibold text-neutral-900 truncate">
            {{ vehicleSummary.title }}
          </div>
          <div class="text-xs text-neutral-600 truncate">
            {{ vehicleSummary.variant }}
          </div>
        </div>
        <div class="shrink-0 text-right">
          <div class="text-[11px] text-neutral-500">Price</div>
          <div class="text-lg font-semibold text-[#0072BC] whitespace-nowrap">
            {{ vehicleSummary.price }}
          </div>
        </div>
      </div>

      <!-- Pre-Approval Form Card -->
      <div class="rounded-[28px] border border-neutral-300 bg-white p-6 space-y-5">
        <form v-if="!submitted" class="space-y-4" @submit.prevent="handleSubmit">
          <!-- Title -->
          <label class="block text-xs font-medium text-[#004A87]">
            Title
            <div class="relative mt-1.5">
              <select
                v-model="title"
                required
                class="w-full appearance-none rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 pr-10 text-sm text-[#004A87] focus:outline-none focus:border-[#0072BC] cursor-pointer"
              >
                <option value="" disabled>Select Title</option>
                <option v-for="opt in titleOptions" :key="opt" :value="opt">{{ opt }}</option>
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

          <!-- Your SA ID -->
          <label class="block text-xs font-medium text-[#004A87]">
            Your SA ID
            <input
              v-model="saId"
              type="text"
              required
              placeholder="Enter your 13-digit SA ID number"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- First Name -->
          <label class="block text-xs font-medium text-[#004A87]">
            First Name
            <input
              v-model="firstName"
              type="text"
              required
              placeholder="First Name"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- Last Name -->
          <label class="block text-xs font-medium text-[#004A87]">
            Last Name
            <input
              v-model="lastName"
              type="text"
              required
              placeholder="Last Name"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- Cellphone -->
          <label class="block text-xs font-medium text-[#004A87]">
            Cellphone
            <input
              v-model="cellphone"
              type="tel"
              required
              placeholder="+27 72 000-0000"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- Email -->
          <label class="block text-xs font-medium text-[#004A87]">
            Email
            <input
              v-model="email"
              type="email"
              required
              placeholder="john@example.com"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- Employment Status -->
          <label class="block text-xs font-medium text-[#004A87]">
            Employment Status
            <div class="relative mt-1.5">
              <select
                v-model="employmentStatus"
                required
                class="w-full appearance-none rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 pr-10 text-sm text-[#004A87] focus:outline-none focus:border-[#0072BC] cursor-pointer"
              >
                <option value="" disabled>Select Employment Status</option>
                <option v-for="opt in employmentOptions" :key="opt" :value="opt">{{ opt }}</option>
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

          <!-- Marital Status -->
          <label class="block text-xs font-medium text-[#004A87]">
            Marital Status
            <div class="relative mt-1.5">
              <select
                v-model="maritalStatus"
                required
                class="w-full appearance-none rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 pr-10 text-sm text-[#004A87] focus:outline-none focus:border-[#0072BC] cursor-pointer"
              >
                <option value="" disabled>Select Marital Status</option>
                <option v-for="opt in maritalOptions" :key="opt" :value="opt">{{ opt }}</option>
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

          <!-- Gross Income -->
          <label class="block text-xs font-medium text-[#004A87]">
            Gross Income
            <input
              v-model="grossIncome"
              type="number"
              min="0"
              required
              placeholder="R 0"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- Net Income -->
          <label class="block text-xs font-medium text-[#004A87]">
            Net Income
            <input
              v-model="netIncome"
              type="number"
              min="0"
              required
              placeholder="R 0"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- Your Total Expenses -->
          <label class="block text-xs font-medium text-[#004A87]">
            Your Total Expenses
            <input
              v-model="totalExpenses"
              type="number"
              min="0"
              required
              placeholder="R 0"
              class="mt-1.5 w-full rounded-full bg-[#E5EFF8] border border-neutral-200 px-5 py-3 text-sm text-[#004A87] placeholder:text-[#004A87]/60 focus:outline-none focus:border-[#0072BC]"
            />
          </label>

          <!-- Declarations / Checkboxes -->
          <div class="space-y-2.5 pt-2 text-xs text-[#004A87]">
            <label class="flex items-start gap-2.5 cursor-pointer">
              <input
                v-model="hasDriversLicense"
                type="checkbox"
                required
                class="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#0072BC] focus:ring-[#0072BC]"
              />
              <span>I have a valid South African Driver's License</span>
            </label>

            <label class="flex items-start gap-2.5 cursor-pointer">
              <input
                v-model="notUnderDebtReview"
                type="checkbox"
                required
                class="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#0072BC] focus:ring-[#0072BC]"
              />
              <span>I confirm that I am not under debt review</span>
            </label>

            <label class="flex items-start gap-2.5 cursor-pointer">
              <input
                v-model="agreeTerms"
                type="checkbox"
                required
                class="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#0072BC] focus:ring-[#0072BC]"
              />
              <span>By submitting this form I agree to the terms and conditions and privacy policies</span>
            </label>

            <label class="flex items-start gap-2.5 cursor-pointer">
              <input
                v-model="consentCreditCheck"
                type="checkbox"
                required
                class="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#0072BC] focus:ring-[#0072BC]"
              />
              <span>I consent to a credit bureau check</span>
            </label>

            <label class="flex items-start gap-2.5 cursor-pointer">
              <input
                v-model="needInsurance"
                type="checkbox"
                class="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#0072BC] focus:ring-[#0072BC]"
              />
              <span>I will need insurance</span>
            </label>
          </div>

          <button
            type="submit"
            class="w-full rounded-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
          >
            Submit Pre-Approval
          </button>
        </form>

        <div
          v-else
          class="rounded-2xl bg-[#E5EFF8] border border-[#0072BC]/20 p-5 text-center space-y-2"
        >
          <p class="text-sm font-semibold text-[#004A87]">Pre-Approval Application Submitted!</p>
          <p class="text-xs text-[#004A87]/80">
            Thank you, {{ title }} {{ firstName }} {{ lastName }}. Our finance team at {{ vehicleSummary.dealerName }} will review your application and contact you shortly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
