import { ref, computed } from 'vue'

const favorites = ref(new Set())

export function useWishlist() {
  const wishlistCount = computed(() => favorites.value.size)

  function toggleFavorite(vehicleId) {
    const next = new Set(favorites.value)
    if (next.has(vehicleId)) {
      next.delete(vehicleId)
    } else {
      next.add(vehicleId)
    }
    favorites.value = next
  }

  function isFavorite(vehicleId) {
    return favorites.value.has(vehicleId)
  }

  return {
    favorites,
    wishlistCount,
    toggleFavorite,
    isFavorite,
  }
}
