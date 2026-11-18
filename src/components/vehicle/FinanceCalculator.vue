<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
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
  >
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-semibold text-neutral-800">
        Finance Calculator — {{ vehicle.name }}
      </h4>
      <button
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

    <!-- Estimated Terms Output -->
    <div class="mt-5 pt-4 border-t border-neutral-200 space-y-2">
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
</template>
