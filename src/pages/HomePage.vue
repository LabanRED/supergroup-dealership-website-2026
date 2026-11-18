<script setup>
import HeroBanner from '../components/banner/HeroBanner.vue'
import MobileSearch from '../components/search/MobileSearch.vue'
import BrandLogos from '../components/brand-logos/BrandLogos.vue'
import SupergroupDivider from '../components/common/SupergroupDivider.vue'
import CarouselImage from '../components/carousel/CarouselImage.vue'
import CustomerReviews from '../components/reviews/CustomerReviews.vue'
import FooterCTA from '../components/cta/FooterCTA.vue'
</script>

<template>
  <div>
    <!-- 1. HeroBanner -->
    <HeroBanner />

    <!-- Mobile Search & Filter -->
    <MobileSearch />

    <!-- Brand Logos -->
    <BrandLogos />

    <!-- Divider -->
    <SupergroupDivider />

    <!-- Raising The Standard In Customer Satisfaction -->
    <CarouselImage />

    <!-- Customer Reviews -->
    <CustomerReviews />

    <!-- Browse Showroom CTA -->
    <FooterCTA />
  </div>
</template>
