<script setup>
import { ref, computed } from 'vue'
import { useDevicePreview } from '../../composables/useDevicePreview.js'

const { activeDevice } = useDevicePreview()

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  showIntro: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const purchasePrice = ref(props.vehicle.priceValue ?? 0)
const deposit = ref(0)
const interestRate = ref(10.75)
const paymentTerm = ref(72)
const balloonPercent = ref(0)

// Snapshot used for "Your Estimated Terms*" (initialized with vehicle defaults and updated on Calculate)
const calcSnapshot = ref({
  purchasePrice: Number(props.vehicle.priceValue ?? 0),
  deposit: 0,
  interestRate: 10.75,
  paymentTerm: 72,
  balloonPercent: 0,
})

function calculateTerms() {
  calcSnapshot.value = {
    purchasePrice: Number(purchasePrice.value) || 0,
    deposit: Number(deposit.value) || 0,
    interestRate: Number(interestRate.value) || 0,
    paymentTerm: Number(paymentTerm.value) || 72,
    balloonPercent: Number(balloonPercent.value) || 0,
  }
}

const results = computed(() => {
  const price = calcSnapshot.value.purchasePrice
  const dep = calcSnapshot.value.deposit
  const rate = calcSnapshot.value.interestRate
  const months = calcSnapshot.value.paymentTerm
  const balloonPct = calcSnapshot.value.balloonPercent

  if (price <= 0 || months <= 0) {
    return { valid: false }
  }

  const principal = Math.max(0, price - dep)
  const balloonAmount = price * (balloonPct / 100)
  const monthlyRate = rate / 100 / 12

  let monthly = 0
  if (principal > 0) {
    if (monthlyRate === 0) {
      monthly = Math.max(0, (principal - balloonAmount) / months)
    } else {
      const pvBalloon = balloonAmount / Math.pow(1 + monthlyRate, months)
      const netPrincipal = Math.max(0, principal - pvBalloon)
      monthly = (netPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
    }
  }

  const totalRepayments = monthly * months + balloonAmount
  const totalFinanceCosts = Math.max(0, totalRepayments - principal)

  return {
    valid: true,
    monthly,
    price,
    rate,
    months,
    dep,
    balloonAmount,
    totalRepayments,
    totalFinanceCosts,
  }
})

function formatRand(value) {
  return `R ${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`
}
</script>

<template>
  <div
    class="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.08)] text-left"
    :class="showIntro && activeDevice !== 'mobile' ? 'lg:rounded-[28px] lg:p-8' : ''"
  >
    <div
      :class="
        showIntro && activeDevice !== 'mobile'
          ? 'space-y-5 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-stretch'
          : ''
      "
    >
      <!-- Optional Vehicle Image Inside Same Container -->
      <div
        v-if="showIntro"
        :class="activeDevice === 'mobile' ? 'mb-4' : 'mb-4 lg:mb-0 lg:col-span-5'"
      >
        <div
          class="overflow-hidden rounded-[20px] bg-neutral-100 aspect-[16/11]"
          :class="activeDevice === 'mobile' ? '' : 'lg:aspect-auto lg:h-full'"
        >
          <img
            :src="vehicle.images?.[0]"
            :alt="vehicle.name"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Calculator Column -->
      <div :class="showIntro && activeDevice !== 'mobile' ? 'lg:col-span-7' : ''">
        <!-- Optional Affordability Intro -->
        <div v-if="showIntro" class="space-y-1 mb-4">
          <div class="text-xs font-semibold uppercase tracking-wide text-[#0072BC]">
            CAN I AFFORD IT?
          </div>
          <p class="text-base font-normal text-neutral-800 leading-relaxed">
            Assessing affordability is an important part of making a well-informed decision. We're here to help you every step of the way.
          </p>
        </div>

        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-semibold text-neutral-800">
            Finance Calculator — {{ vehicle.name }}
          </h4>
          <button
            v-if="closable"
            type="button"
            aria-label="Close calculator"
            class="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
            @click="emit('close')"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Main Calculator Body (Stacked on Mobile/Modal, 2-Column on Desktop VDP) -->
        <div
          :class="
            !closable && activeDevice !== 'mobile'
              ? 'lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start'
              : ''
          "
        >
          <!-- Left: Inputs + Action Buttons -->
          <div :class="!closable && activeDevice !== 'mobile' ? 'lg:col-span-7' : ''">
            <!-- Calculator Form Fields -->
            <div class="space-y-3">
              <div class="grid grid-cols-[120px_1fr] items-center gap-3">
                <label class="text-xs font-medium text-neutral-700">Purchase Price:</label>
                <input
                  v-model.number="purchasePrice"
                  type="number"
                  min="0"
                  class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-[#0072BC] focus:outline-none"
                />
              </div>

              <div class="grid grid-cols-[120px_1fr] items-center gap-3">
                <label class="text-xs font-medium text-neutral-700">Deposit:</label>
                <input
                  v-model.number="deposit"
                  type="number"
                  min="0"
                  class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-[#0072BC] focus:outline-none"
                />
              </div>

              <div class="grid grid-cols-[120px_1fr] items-center gap-3">
                <label class="text-xs font-medium text-neutral-700">Interest Rate:</label>
                <input
                  v-model.number="interestRate"
                  type="number"
                  min="0"
                  step="0.25"
                  class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-[#0072BC] focus:outline-none"
                />
              </div>

              <div class="grid grid-cols-[120px_1fr] items-center gap-3">
                <label class="text-xs font-medium text-neutral-700">Payment Term:</label>
                <select
                  v-model.number="paymentTerm"
                  class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-[#0072BC] focus:outline-none"
                >
                  <option :value="12">12 Months</option>
                  <option :value="24">24 Months</option>
                  <option :value="36">36 Months</option>
                  <option :value="48">48 Months</option>
                  <option :value="60">60 Months</option>
                  <option :value="72">72 Months</option>
                </select>
              </div>

              <div class="grid grid-cols-[120px_1fr] items-center gap-3">
                <label class="text-xs font-medium text-neutral-700">Balloon %:</label>
                <select
                  v-model.number="balloonPercent"
                  class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-[#0072BC] focus:outline-none"
                >
                  <option :value="0">0%</option>
                  <option :value="10">10%</option>
                  <option :value="15">15%</option>
                  <option :value="20">20%</option>
                  <option :value="25">25%</option>
                  <option :value="30">30%</option>
                  <option :value="35">35%</option>
                  <option :value="40">40%</option>
                </select>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 mt-4">
              <a
                href="#contact"
                class="rounded-lg py-2.5 px-4 text-center text-xs font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity"
              >
                Get Finance
              </a>
              <button
                type="button"
                class="rounded-lg py-2.5 px-4 text-center text-xs font-medium text-white bg-gradient-to-r from-[#0072BC] to-[#2FA6F3] shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                @click="calculateTerms"
              >
                Calculate
              </button>
            </div>
          </div>

          <!-- Right: Estimated Terms Output -->
          <div
            class="mt-5 pt-4 border-t border-neutral-200 space-y-2"
            :class="
              !closable && activeDevice !== 'mobile'
                ? 'lg:col-span-5 lg:mt-0 lg:pt-0 lg:border-t-0 lg:border-l lg:border-neutral-200 lg:pl-6'
                : ''
            "
          >
            <h5 class="text-sm font-semibold text-neutral-800">Your Estimated Terms*</h5>

            <p v-if="!results.valid" class="text-sm text-neutral-600">
              Please complete the fields above
            </p>
            <p v-else class="text-2xl font-semibold text-[#0072BC]">
              {{ formatRand(results.monthly) }} <span class="text-sm font-normal text-neutral-600">p/m*</span>
            </p>

            <p class="text-[11px] text-neutral-500">
              *Excludes finance initiation and admin fees.
            </p>

            <div class="text-xs text-neutral-700 space-y-1 pt-1">
              <div class="font-medium text-neutral-800">Based on:</div>
              <div>Purchase Price: {{ results.valid ? formatRand(results.price) : '' }}</div>
              <div>Interest: {{ results.valid ? `${results.rate}%` : '%' }}</div>
              <div>Term: {{ results.valid ? `${results.months} months` : 'months' }}</div>
              <div>Deposit: {{ results.valid ? formatRand(results.dep) : 'R' }}</div>
              <div>Balloon: {{ results.valid ? formatRand(results.balloonAmount) : 'R' }}</div>
              <div>Total Repayments: {{ results.valid ? formatRand(results.totalRepayments) : 'R' }}</div>
              <div>Total finance costs: {{ results.valid ? formatRand(results.totalFinanceCosts) : 'R' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full-Width Disclaimer Inside Same Container -->
    <div class="pt-4 mt-6 border-t border-neutral-200 text-center space-y-1.5">
      <div class="text-xs font-semibold text-[#0072BC]">*Disclaimer</div>
      <p class="text-[11px] leading-relaxed text-neutral-600 text-left">
        The instalment quoted doesn't include any admins costs, license and registration of the vehicle and any value added products. All calculations, rates quoted and payments shown are GUIDELINES ONLY and are not quotations. The final rates and payments can only be determined by your Finance House once they have assessed all your information (completed in a finance application form). By using this calculator, you hereby INDEMNIFY Supergroup Dealerships, its holding, associated or partner companies against any loss or liability which you may suffer as a result of using the calculator. All information provided to you on this website is for illustrative purposes only and may not be considered to be ADVICE.
      </p>
    </div>
  </div>
</template>
