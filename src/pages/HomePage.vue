<script setup>
import HeroBanner from '../components/banner/HeroBanner.vue'
import MobileSearch from '../components/search/MobileSearch.vue'
import BrandLogos from '../components/brand-logos/BrandLogos.vue'
import SupergroupDivider from '../components/common/SupergroupDivider.vue'
import GradientCarousel from '../components/carousel/GradientCarousel.vue'
import CarouselImage from '../components/carousel/CarouselImage.vue'
import BodyCTA from '../components/cta/BodyCTA.vue'
import CarouselIcons from '../components/carousel/CarouselIcons.vue'
import DefaultCarousel from '../components/carousel/DefaultCarousel.vue'
import IconServices from '../components/services/IconServices.vue'
import FutureFeature from '../components/features/FutureFeature.vue'
import FAQ from '../components/faq/FAQ.vue'
import FooterCTA from '../components/cta/FooterCTA.vue'

const leadCaptureSlides = [
  {
    id: 'capture',
    eyebrow: 'Step 01 • Capture',
    title: 'Engage shoppers the moment they message',
    description:
      'Whether a buyer comments on an Instagram reel or opens LiveChat AI at 11 PM, PostX responds immediately with accurate vehicle details.',
    highlight: 'Under 3s AI response',
    outcome: 'Never lose an after-hours showroom lead to a competitor.',
  },
  {
    id: 'qualify',
    eyebrow: 'Step 02 • Qualify',
    title: 'Collect trade-in, finance, and model preferences',
    description:
      'Conversational prompts gather buyer intent naturally and tag each thread by branch, model interest, and urgency.',
    highlight: '3.2x higher qualification rate',
    outcome: 'Sales advisors receive clean, actionable buyer profiles.',
  },
  {
    id: 'convert',
    eyebrow: 'Step 03 • Convert',
    title: 'Book test drives directly into your showroom calendar',
    description:
      'Qualified leads are routed into your CRM and Unified Inbox with full conversation history attached.',
    highlight: 'Automated CRM handoff',
    outcome: 'Seamless transition from social discovery to showroom floor.',
  },
]
</script>

<template>
  <div>
    <!-- 1. HeroBanner -->
    <HeroBanner />

    <!-- Mobile Search & Filter -->
    <MobileSearch />

    <!-- 3. BrandLogos -->
    <BrandLogos />

    <!-- Divider -->
    <SupergroupDivider />

    <!-- 5. CarouselImage -->
    <CarouselImage />

    <!-- 2. Proprietary / Intro Section -->
    <section id="about" class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-6 space-y-4">
          <span class="text-xs font-semibold uppercase tracking-widest text-[#00A5C5]">
            Proprietary Architecture
          </span>
          <h2>
            Purpose-built for automotive retail—not generic social scheduling
          </h2>
        </div>
        <div class="lg:col-span-6 space-y-4">
          <p class="text-neutral-600">
            Generic social tools break down when managing dozens of dealership rooftops, OEM compliance rules, and high-intent vehicle inquiries. PostX gives your group a single proprietary platform engineered around how modern dealerships actually sell and service vehicles.
          </p>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 rounded-full bg-neutral-100 text-xs font-medium text-neutral-800">
              Multi-Rooftop Governance
            </span>
            <span class="px-4 py-2 rounded-full bg-neutral-100 text-xs font-medium text-neutral-800">
              OEM Brand Control
            </span>
            <span class="px-4 py-2 rounded-full bg-neutral-100 text-xs font-medium text-neutral-800">
              24/7 AI Lead Routing
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. GradientCarousel -->
    <GradientCarousel />

    <!-- 6. BodyCTA -->
    <BodyCTA />

    <!-- 7. Mobile App & AI Assistant Sections + CarouselIcons -->
    <section class="mx-auto max-w-[1400px] px-[20px] md:px-10 pt-8 pb-2">
      <div class="max-w-2xl space-y-3">
        <span class="text-xs font-semibold uppercase tracking-widest text-[#00A5C5]">
          Mobile & AI Copilot
        </span>
        <h2>
          Your dealership command center in your pocket
        </h2>
        <p class="text-neutral-600">
          Approve campaigns, monitor branch SLAs, and let AI draft on-brand replies wherever you are.
        </p>
      </div>
    </section>
    <CarouselIcons />

    <!-- 8. Automated Customer Journey + DefaultCarousel -->
    <section id="blogs" class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-8 space-y-8">
      <div class="max-w-2xl space-y-3">
        <span class="text-xs font-semibold uppercase tracking-widest text-[#00A5C5]">
          Automated Customer Journey
        </span>
        <h2>
          From first social impression to booked test drive
        </h2>
        <p class="text-neutral-600">
          Turn every comment, DM, and website chat into a structured, measurable showroom opportunity.
        </p>
      </div>

      <DefaultCarousel :slides="leadCaptureSlides" />
    </section>

    <!-- 9. IconServices -->
    <IconServices />

    <!-- 10. Trust / Proprietary Ownership Section -->
    <section class="mx-auto max-w-[1400px] px-[20px] md:px-10 py-8">
      <div class="rounded-[32px] bg-neutral-50 border border-neutral-200 p-8 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="text-3xl md:text-4xl font-semibold text-[#00A5C5] mb-2">100%</div>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">Full Data Ownership</h3>
          <p class="text-sm text-neutral-600">
            Your dealer group retains complete ownership of every social account, customer conversation, and analytics dataset.
          </p>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-semibold text-[#00A5C5] mb-2">99.9%</div>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">Enterprise Reliability</h3>
          <p class="text-sm text-neutral-600">
            Built for high-volume national campaigns and simultaneous multi-branch publishing without bottlenecks.
          </p>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-semibold text-[#00A5C5] mb-2">&lt; 5 min</div>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">Average Lead Handoff</h3>
          <p class="text-sm text-neutral-600">
            Instant AI triage routes qualified buyers straight to the right dealership advisor.
          </p>
        </div>
      </div>
    </section>

    <!-- 11. FutureFeature -->
    <FutureFeature />

    <!-- 12. FAQ -->
    <FAQ />

    <!-- 13. FooterCTA -->
    <FooterCTA />
  </div>
</template>
