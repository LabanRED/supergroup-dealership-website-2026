import defaultDealerImage from '../images/suzuki-dealer-image.webp'

const dealerImageModules = import.meta.glob(
  '../images/dealer-images/*.{webp,jpg,jpeg,png}',
  { eager: true, import: 'default' },
)

const STOP_WORDS = new Set(['supergroup', 'dealership', 'dealerships', 'cars', 'motors', 'auto', 'the', 'pty', 'ltd'])

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bcenter\b/g, 'centre')
    .replace(/\bforon\b/g, 'foton')
    .replace(/\bnorthclif\b/g, 'northcliff')
    .replace(/\bvw\b/g, 'volkswagen')
    .replace(/\bjlr\b/g, 'jaguar land rover')
    .replace(/\bleap\s+motor\b/g, 'leapmotor')
    .trim()
}

function tokenize(value) {
  return normalizeText(value)
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token))
}

const indexedDealerImages = Object.entries(dealerImageModules).map(([path, src]) => {
  const filename = path.split('/').pop() || ''
  const tokens = tokenize(filename)
  return {
    filename,
    src,
    tokens,
    tokenSet: new Set(tokens),
  }
})

export function getDealerImage(dealerName) {
  const dealerTokens = tokenize(dealerName)
  if (!dealerTokens.length) return defaultDealerImage

  const dealerSet = new Set(dealerTokens)
  let bestMatch = null
  let bestScore = 0

  for (const entry of indexedDealerImages) {
    if (!entry.tokens.length) continue
    let matched = 0
    for (const token of entry.tokens) {
      if (dealerSet.has(token)) {
        matched += 1
      }
    }

    const coverage = matched / entry.tokens.length
    if (coverage >= 0.75 && matched >= Math.min(2, entry.tokens.length)) {
      const score = matched * 10 + coverage
      if (score > bestScore) {
        bestScore = score
        bestMatch = entry.src
      }
    }
  }

  return bestMatch || defaultDealerImage
}
