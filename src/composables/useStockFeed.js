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

function extractEngineSize(variant, text = '') {
  const combined = `${variant || ''} ${text || ''}`
  const ccMatch = combined.match(/\b(\d{3,4})\s*cc\b/i)
  const litreMatch =
    String(variant || '').match(/\b(\d\.\d)\s*(?:L|T|TD|TDI|TSI|TCI|TFSI|CDI|I|D|V)?\b/i) ||
    String(text || '').match(/\b(\d\.\d)\s*(?:l|litre|liter)s?\b/i)

  if (ccMatch && litreMatch) {
    return `${formatNumberSpaces(Number(ccMatch[1]))} cc (${litreMatch[1]}L)`
  }
  if (ccMatch) {
    return `${formatNumberSpaces(Number(ccMatch[1]))} cc`
  }
  if (litreMatch) {
    return `${litreMatch[1]}L`
  }
  return 'N/A'
}

function extractCylinders(variant, text = '') {
  const combined = `${text || ''} ${variant || ''}`
  const hasTurbo = /\bturbo(?:charged)?\b/i.test(combined)
  const hasTwinTurbo = /\btwin[-\s]?turbo\b/i.test(combined)
  const turboSuffix = hasTwinTurbo ? ' Twin-Turbo' : hasTurbo ? ' Turbo' : ''

  const inlineMatch = combined.match(/\b[iI]([3456])\b/)
  if (inlineMatch) {
    return `${inlineMatch[1]}-Cylinder Inline${turboSuffix}`
  }

  const vMatch = combined.match(/\b[vV](6|8|10|12)\b/)
  if (vMatch) {
    return `V${vMatch[1]}${turboSuffix}`
  }

  const cylMatch = combined.match(/\b(\d{1,2})[-\s]?cyl(?:inder)?s?\b/i)
  if (cylMatch) {
    return `${cylMatch[1]}-Cylinder${turboSuffix}`
  }

  const flatMatch = combined.match(/\bflat[-\s]?([46])\b/i)
  if (flatMatch) {
    return `${flatMatch[1]}-Cylinder Boxer${turboSuffix}`
  }

  return 'N/A'
}

function extractMaxPower(variant, text = '') {
  const combined = `${text || ''} ${variant || ''}`
  const match = combined.match(/\b(\d+(?:\.\d+)?)\s*kW(?:\s*@\s*([\d,\s]+)\s*rpm)?\b/i)
  if (!match) return 'N/A'
  return match[2] ? `${match[1]} kW @ ${match[2].trim()} rpm` : `${match[1]} kW`
}

function extractMaxTorque(variant, text = '') {
  const combined = `${text || ''} ${variant || ''}`
  const match = combined.match(/\b(\d+(?:\.\d+)?)\s*Nm(?:\s*@\s*([\d,\s]+)\s*rpm)?\b/i)
  if (!match) return 'N/A'
  return match[2] ? `${match[1]} Nm @ ${match[2].trim()} rpm` : `${match[1]} Nm`
}

function extractFuelConsumption(text = '', fuelType = '') {
  const lPer100 = String(text || '').match(/\b(\d+(?:\.\d+)?)\s*l\s*\/\s*100\s*km\b/i)
  if (lPer100) return `${lPer100[1]} L/100 km`

  if (fuelType === 'Electric') {
    const kwhPer100 = String(text || '').match(/\b(\d+(?:\.\d+)?)\s*kWh\s*\/\s*100\s*km\b/i)
    if (kwhPer100) return `${kwhPer100[1]} kWh/100 km`
  }

  return 'N/A'
}

function buildEngineSpecs(item, trim, description, fuelType) {
  const specText = [item.features, item.comments, item.disclaimer, description].filter(Boolean).join(' ')
  const rawFuel = String(item.fuelType || '').trim()

  return [
    { label: 'Engine Size', value: extractEngineSize(trim, specText) },
    { label: 'Cylinders', value: extractCylinders(trim, specText) },
    { label: 'Fuel Type', value: rawFuel ? fuelType : 'N/A' },
    { label: 'Max Power', value: extractMaxPower(trim, specText) },
    { label: 'Max Torque', value: extractMaxTorque(trim, specText) },
    { label: 'Fuel Consumption', value: extractFuelConsumption(specText, fuelType) },
  ]
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

  const fuelType = normalizeFuelType(item.fuelType)
  const engineSpecs = buildEngineSpecs(item, trim, description, fuelType)
  const engineSize = engineSpecs[0].value

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
    fuelType,
    exteriorColour: formatTitleCase(item.colour, 'Standard'),
    engineSize,
    engineSpecs,
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
