import kwid1 from '../images/1Jtan3uuSXWFHvHLQFaTzAaPEokNClQBKO6kRegD.jpg'
import kwid2 from '../images/BWlN7cQlmWiILtvdLa9ECun7mexMXu9VSdW9Jnzb.jpg'
import kwid3 from '../images/KwQR3tb5egXz3upjD4eVQqV1pCax2q0ayxms5eYT.jpg'
import kwid4 from '../images/KyZXfI41n7VYJHCav24m3twJ7AJc9VXA1JSQFUjT.jpg'
import kwid5 from '../images/RlI7K14gOFlnW4ryx9JI00LUNHLyf8kTwhPj8MJ8.jpg'
import kwid6 from '../images/rObRGkzMSrnecU8RwI3MD4KupMi0GDJlQUNYyR0m.jpg'
import kwid7 from '../images/WrbcO9oLj52Q8Pg16sGfZc7FCzVMTZflff9ARBjV.jpg'

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
]
