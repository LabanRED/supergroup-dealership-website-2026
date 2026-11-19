import kwid1 from '../images/1Jtan3uuSXWFHvHLQFaTzAaPEokNClQBKO6kRegD.jpg'
import kwid2 from '../images/BWlN7cQlmWiILtvdLa9ECun7mexMXu9VSdW9Jnzb.jpg'
import kwid3 from '../images/KwQR3tb5egXz3upjD4eVQqV1pCax2q0ayxms5eYT.jpg'
import kwid4 from '../images/KyZXfI41n7VYJHCav24m3twJ7AJc9VXA1JSQFUjT.jpg'
import kwid5 from '../images/RlI7K14gOFlnW4ryx9JI00LUNHLyf8kTwhPj8MJ8.jpg'
import kwid6 from '../images/rObRGkzMSrnecU8RwI3MD4KupMi0GDJlQUNYyR0m.jpg'
import kwid7 from '../images/WrbcO9oLj52Q8Pg16sGfZc7FCzVMTZflff9ARBjV.jpg'

import ora1 from '../images/22f4bc3598e5c5a522eb9c33cf8e25d7.png'
import ora2 from '../images/23881a0b237653f11afe614076c1528a.png'
import ora3 from '../images/6cfe57f02a71585b6b37d3b1ffd873e5.png'
import ora4 from '../images/7a1d96009b16bae815ec019c687e25fa.png'
import ora5 from '../images/7dc23b9ae726620b75883a47851d543d.png'
import ora6 from '../images/93944d28234b0e6886aa2be55f6a4289.png'
import ora7 from '../images/c0d73944590dd349841699e200d8a182.png'

import geely1 from '../images/10eb35871589fb0fbe3312b2cc54ad7a.jpg'
import geely2 from '../images/15a88a3a272f2743ae1e77b1ee0af086.jpg'
import geely3 from '../images/449e48af0cbb1de9a5cd2076a54307f8.jpg'
import geely4 from '../images/57e7154890f22a496b2370c249381786.jpg'
import geely5 from '../images/c15e6ce971f4ef62641b90504a53060c.jpg'
import geely6 from '../images/ddfe3e254c1910c6d880345bfe462b4b.jpg'

const oraGallery = [ora1, ora2, ora3, ora4, ora5, ora6, ora7]
const geelyGallery = [geely1, geely2, geely3, geely4, geely5, geely6]

const kwidGallery = [kwid4, kwid3, kwid2, kwid5, kwid6, kwid1, kwid7]

const clioModules = import.meta.glob('../images/clio-*.jpg', {
  eager: true,
  import: 'default',
})

const clioGallery = Object.entries(clioModules)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/clio-(\d+)\.jpg$/)?.[1] || 0)
    const numB = Number(b.match(/clio-(\d+)\.jpg$/)?.[1] || 0)
    return numA - numB
  })
  .map(([, src]) => src)

const superCarryModules = import.meta.glob('../images/super-carry-*.jpg', {
  eager: true,
  import: 'default',
})

const superCarryGallery = Object.entries(superCarryModules)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/super-carry-(\d+)\.jpg$/)?.[1] || 0)
    const numB = Number(b.match(/super-carry-(\d+)\.jpg$/)?.[1] || 0)
    return numA - numB
  })
  .map(([, src]) => src)

export const vehicles = [
  {
    id: 1,
    year: 2023,
    name: '2023 RENAULT CLIO',
    trim: '1.0T ZEN 5DR (66KW)',
    make: 'Renault',
    model: 'Clio',
    bodyType: 'Hatchback',
    condition: 'Used',
    priceValue: 199900,
    price: 'R199 900',
    estPayment: 'R3 580 p/m*',
    mileageValue: 43987,
    mileage: '43 987 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    dealer: 'Suzuki Edenvale',
    images: clioGallery,
  },
  {
    id: 2,
    year: 2026,
    name: '2026 SUZUKI SUPER CARRY',
    trim: '1.2i P/U S/C (54KW)',
    make: 'Suzuki',
    model: 'Super Carry',
    bodyType: 'Bakkie / Pickup',
    condition: 'New',
    priceValue: 179900,
    price: 'R179 900',
    estPayment: 'R3 220 p/m*',
    mileageValue: 0,
    mileage: '0 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    dealer: 'Suzuki Bedfordview',
    images: superCarryGallery,
  },
  {
    id: 3,
    year: 2026,
    name: '2026 RENAULT KWID',
    trim: '1.0 DYNAMIQUE 5DR (50KW)',
    make: 'Renault',
    model: 'Kwid',
    bodyType: 'Hatchback',
    condition: 'Demo',
    priceValue: 169990,
    price: 'R169 990',
    estPayment: 'R3 050 p/m*',
    mileageValue: 3295,
    mileage: '3 295 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    dealer: 'Lionel Motors Renault',
    images: kwidGallery,
  },
  {
    id: 4,
    year: 2026,
    name: '2026 GWM ORA 5',
    trim: '1.5T HEV SUPER LUXURY DHT',
    make: 'GWM',
    model: 'Ora 5',
    bodyType: 'SUV',
    condition: 'New',
    priceValue: 424900,
    price: 'R424 900',
    estPayment: 'R7 620 p/m*',
    mileageValue: 15,
    mileage: '15 km',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    dealer: 'GWM Haval Benoni',
    images: oraGallery,
  },
  {
    id: 5,
    year: 2026,
    name: '2026 GEELY E2',
    trim: 'E2 ASPIRE',
    make: 'Geely',
    model: 'E2',
    bodyType: 'Hatchback',
    condition: 'New',
    priceValue: 339900,
    price: 'R339 900',
    estPayment: 'R5 750 p/m*',
    mileageValue: 10,
    mileage: '10 km',
    transmission: 'Automatic',
    fuelType: 'Electric',
    dealer: 'Geely Rustenburg',
    images: geelyGallery,
  },
]
