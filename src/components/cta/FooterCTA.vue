<script setup>
import { ref } from 'vue'

const submitted = ref(false)
const email = ref('')

function handleSubmit() {
  if (!email.value.trim()) return
  submitted.value = true
  email.value = ''
}
</script>

<template>
  <section id="contact" class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-6">
    <div
      class="rounded-[32px] bg-gradient-to-br from-[#00A5C5] to-[#2C8799] text-white px-8 py-12 md:px-14 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl"
    >
      <div class="lg:col-span-7 space-y-4">
        <span class="text-xs font-semibold uppercase tracking-widest text-white/80">
          Get Started
        </span>
        <h2 class="!text-white">
          Transform your dealership network with PostX
        </h2>
        <p class="text-white/90 max-w-xl" style="color: rgba(255, 255, 255, 0.9);">
          Book a personalized walkthrough with our automotive specialists and see how PostX scales across every showroom.
        </p>
      </div>

      <div class="lg:col-span-5">
        <form
          v-if="!submitted"
          class="bg-white rounded-3xl p-6 shadow-lg space-y-4 text-neutral-900"
          @submit.prevent="handleSubmit"
        >
          <label class="block text-sm font-medium text-neutral-800">
            Work email
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@dealergroup.com"
              class="mt-2 w-full rounded-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-[#00A5C5]"
            />
          </label>
          <button type="submit" class="btn btn-primary w-full">
            Request Demo
          </button>
        </form>

        <div v-else class="bg-white rounded-3xl p-6 shadow-lg text-neutral-900 text-center space-y-2">
          <div class="text-lg font-medium text-[#00A5C5]">Request received</div>
          <p class="text-sm text-neutral-600">
            Our team will reach out shortly to schedule your walkthrough.
          </p>
          <button
            type="button"
            class="btn btn-primary-outline mt-2"
            @click="submitted = false"
          >
            Send another
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
