import { ref, computed } from 'vue'

const STORAGE_KEY = 'supergroup-wishlist-favorites'

function loadFavorites() {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

function saveFavorites(set) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {
    // Ignore storage quota or privacy-mode errors
  }
}

const favorites = ref(loadFavorites())

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
    saveFavorites(next)
  }

  function isFavorite(vehicleId) {
    return favorites.value.has(vehicleId)
  }

  function clearWishlist() {
    const next = new Set()
    favorites.value = next
    saveFavorites(next)
  }

  return {
    favorites,
    wishlistCount,
    toggleFavorite,
    isFavorite,
    clearWishlist,
  }
}
