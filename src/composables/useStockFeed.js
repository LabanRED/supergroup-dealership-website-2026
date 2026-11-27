import { ref } from 'vue'
import { vehicles as fallbackVehicles } from '../data/vehicles.js'

const FEED_URL = '/api/conexa/Stock?motorGroupId=89'
const DIRECT_FEED_URL = 'https://conexa.r-e-d.co.za/api/Stock?motorGroupId=89'

const UPPERCASE_BRANDS = new Set([
  'BMW',
  'BYD',
  'FAW',
  'GWM',
  'JAC',
  'JMC',
  'KIA',
  'MG',
  'VW',
  'BAIC',
  'LDV',
  'RAM',
  'GMC',
])

function formatBrand(raw) {
  const clean = String(raw || '').trim()
  if (!clean) return 'Unknown'
  const upper = clean.toUpperCase()
  if (UPPERCASE_BRANDS.has(upper)) return upper
  return clean
    .toLowerCase()
    .replace(/(^|[\s-])([a-z])/g, (_, sep, ch) => `${sep}${ch.toUpperCase()}`)
}

function formatTitleCase(raw, fallback = '') {
  const clean = String(raw || '').trim()
  if (!clean) return fallback
  if (clean.toUpperCase() === 'SUV' || clean.toUpperCase() === 'MPV') return clean.toUpperCase()
  return clean
    .toLowerCase()
    .replace(/(^|[\s/-])([a-z])/g, (_, sep, ch) => `${sep}${ch.toUpperCase()}`)
}

function formatNumberSpaces(num) {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function estimateMonthlyPayment(priceValue) {
  if (!priceValue || priceValue <= 0) return 'POA'
  const monthlyRate = 0.1075 / 12
  const months = 72
  const monthly = (priceValue * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
  return `R${formatNumberSpaces(monthly)} p/m*`
}

function normalizeCondition(raw) {
  const upper = String(raw || '').trim().toUpperCase()
  if (upper.includes('NEW')) return 'New'
  if (upper.includes('DEMO')) return 'Demo'
  return 'Used'
}

function normalizeTransmission(raw) {
  const upper = String(raw || '').trim().toUpperCase()
  if (upper.includes('AUTO') || upper.includes('CVT') || upper.includes('DCT') || upper.includes('DHT')) {
    return 'Automatic'
  }
  if (upper.includes('MAN')) return 'Manual'
  return formatTitleCase(raw, 'Automatic')
}

function normalizeFuelType(raw) {
  const upper = String(raw || '').trim().toUpperCase()
  if (upper.includes('ELEC') || upper === 'EV') return 'Electric'
  if (upper.includes('HYB') || upper.includes('HEV') || upper.includes('PHEV')) return 'Hybrid'
  if (upper.includes('DIES')) return 'Diesel'
  if (upper.includes('PETR') || upper.includes('GAS')) return 'Petrol'
  return formatTitleCase(raw, 'Petrol')
}

function extractEngineSize(variant) {
  const match = String(variant || '').match(/\b(\d\.\d)\s*(?:L|T|I|D)?\b/i)
  return match ? `${match[1]}L` : '—'
}

function normalizeStockItem(item) {
  const year = Number(item.year) || 2025
  const make = formatBrand(item.brand)
  const model = String(item.model || item.baseModelName || '').trim()
  const trim = String(item.variant || item.modelRange || item.baseVariantName || '').trim()
  const rawPrice =
    Number(item.specialPrice) > 0
      ? Number(item.specialPrice)
      : Number(item.price) || 0
  const mileageValue = Number(String(item.mileage ?? '0').replace(/[^\d]/g, '')) || 0
  const images = Array.isArray(item.mainUrls) && item.mainUrls.length > 0
    ? item.mainUrls.filter(Boolean)
    : item.image
      ? [item.image]
      : []

  const dealer = String(item.dealershipName || 'Supergroup Dealerships').trim()
  const addressParts = [item.streetAddress, item.city].map((s) => String(s || '').trim()).filter(Boolean)
  const address = addressParts.length ? addressParts.join(', ') : String(item.region || 'South Africa')
  const description = String(item.features || item.comments || item.disclaimer || '')
    .replace(/\r\n/g, '\n')
    .trim()

  return {
    id: item.stockId,
    stockNo: item.stockNo || '',
    year,
    name: `${year} ${make} ${model}`.trim().toUpperCase(),
    trim,
    make,
    model,
    bodyType: formatTitleCase(item.bodyType, 'SUV'),
    condition: normalizeCondition(item.newUsed),
    priceValue: rawPrice,
    price: rawPrice > 0 ? `R${formatNumberSpaces(rawPrice)}` : 'POA',
    estPayment: estimateMonthlyPayment(rawPrice),
    mileageValue,
    mileage: `${formatNumberSpaces(mileageValue)} km`,
    transmission: normalizeTransmission(item.transmission),
    fuelType: normalizeFuelType(item.fuelType),
    exteriorColour: formatTitleCase(item.colour, 'Standard'),
    engineSize: extractEngineSize(trim),
    dealer,
    region: String(item.region || '').trim(),
    address,
    phone: String(item.cellNumber || '010 593 4429').trim(),
    description:
      description ||
      `${year} ${make} ${model} ${trim} available at ${dealer}. Contact our sales team for full vehicle details and tailored finance options.`,
    images,
  }
}

const stockVehicles = ref(fallbackVehicles)
const stockTotal = ref(fallbackVehicles.length)
const isLoading = ref(false)
const feedError = ref(null)
const hasLoaded = ref(false)
const usingLiveFeed = ref(false)
let inflightPromise = null

async function loadStockFeed() {
  if (hasLoaded.value) return stockVehicles.value
  if (inflightPromise) return inflightPromise

  isLoading.value = true
  feedError.value = null

  inflightPromise = (async () => {
    try {
      let response = await fetch(FEED_URL)
      if (!response.ok) {
        response = await fetch(DIRECT_FEED_URL)
      }
      if (!response.ok) {
        throw new Error(`Feed returned HTTP ${response.status}`)
      }
      const data = await response.json()
      const rawList = Array.isArray(data) ? data : Array.isArray(data?.list) ? data.list : []
      const normalized = rawList
        .map(normalizeStockItem)
        .filter((v) => v.id && v.images.length > 0)

      if (normalized.length > 0) {
        stockVehicles.value = normalized
        stockTotal.value = Number(data?.total) || normalized.length
        usingLiveFeed.value = true
      }
      hasLoaded.value = true
    } catch (err) {
      feedError.value = err instanceof Error ? err.message : 'Unable to load live stock feed'
      usingLiveFeed.value = false
    } finally {
      isLoading.value = false
      inflightPromise = null
    }
    return stockVehicles.value
  })()

  return inflightPromise
}

export function useStockFeed() {
  if (typeof window !== 'undefined' && !hasLoaded.value && !inflightPromise) {
    loadStockFeed()
  }

  return {
    stockVehicles,
    stockTotal,
    isLoading,
    feedError,
    usingLiveFeed,
    loadStockFeed,
  }
}
