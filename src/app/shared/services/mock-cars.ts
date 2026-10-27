import { BodyType, Car, FuelType, Gearbox } from '../models/car';

interface ModelDef {
  name: string;
  bodyTypes: BodyType[];
}

interface BrandDef {
  basePrice: number;
  models: ModelDef[];
}

export const CATALOG: Record<string, BrandDef> = {
  Audi: {
    basePrice: 190000,
    models: [
      { name: 'A3', bodyTypes: ['hatchback', 'sedan'] },
      { name: 'A4', bodyTypes: ['sedan', 'estate'] },
      { name: 'A6', bodyTypes: ['sedan', 'estate'] },
      { name: 'Q5', bodyTypes: ['suv'] },
    ],
  },
  BMW: {
    basePrice: 210000,
    models: [
      { name: '3 Series', bodyTypes: ['sedan', 'estate'] },
      { name: '5 Series', bodyTypes: ['sedan', 'estate'] },
      { name: '4 Series', bodyTypes: ['coupe'] },
      { name: 'X3', bodyTypes: ['suv'] },
      { name: 'X5', bodyTypes: ['suv'] },
    ],
  },
  Ford: {
    basePrice: 110000,
    models: [
      { name: 'Fiesta', bodyTypes: ['hatchback'] },
      { name: 'Focus', bodyTypes: ['hatchback', 'estate'] },
      { name: 'Mondeo', bodyTypes: ['sedan', 'estate'] },
      { name: 'Kuga', bodyTypes: ['suv'] },
      { name: 'Mustang', bodyTypes: ['coupe'] },
    ],
  },
  Kia: {
    basePrice: 105000,
    models: [
      { name: 'Ceed', bodyTypes: ['hatchback', 'estate'] },
      { name: 'Sportage', bodyTypes: ['suv'] },
    ],
  },
  'Mercedes-Benz': {
    basePrice: 230000,
    models: [
      { name: 'C-Class', bodyTypes: ['sedan', 'estate', 'coupe'] },
      { name: 'E-Class', bodyTypes: ['sedan', 'estate'] },
      { name: 'GLC', bodyTypes: ['suv'] },
    ],
  },
  Skoda: {
    basePrice: 115000,
    models: [
      { name: 'Fabia', bodyTypes: ['hatchback'] },
      { name: 'Octavia', bodyTypes: ['hatchback', 'estate'] },
      { name: 'Superb', bodyTypes: ['sedan', 'estate'] },
      { name: 'Kodiaq', bodyTypes: ['suv'] },
    ],
  },
  Toyota: {
    basePrice: 120000,
    models: [
      { name: 'Yaris', bodyTypes: ['hatchback'] },
      { name: 'Corolla', bodyTypes: ['hatchback', 'sedan', 'estate'] },
      { name: 'C-HR', bodyTypes: ['suv'] },
      { name: 'RAV4', bodyTypes: ['suv'] },
    ],
  },
  Volkswagen: {
    basePrice: 125000,
    models: [
      { name: 'Polo', bodyTypes: ['hatchback'] },
      { name: 'Golf', bodyTypes: ['hatchback', 'estate'] },
      { name: 'Passat', bodyTypes: ['sedan', 'estate'] },
      { name: 'Tiguan', bodyTypes: ['suv'] },
    ],
  },
};

const CITIES = ['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Lublin'];
const FUELS: FuelType[] = ['petrol', 'petrol', 'diesel', 'diesel', 'hybrid', 'electric', 'lpg'];
const GEARBOXES: Gearbox[] = ['manual', 'automatic'];
const CURRENT_YEAR = 2026;

/** Small seeded PRNG so the mock data is the same on every reload (and on server/client). */
function createRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function generateCars(count: number): Car[] {
  const random = createRandom(42);
  const pick = <T>(items: T[]): T => items[Math.floor(random() * items.length)];
  const brands = Object.keys(CATALOG);

  return Array.from({ length: count }, (_, i) => {
    const brand = pick(brands);
    const { basePrice, models } = CATALOG[brand];
    const model = pick(models);
    const age = Math.floor(random() * 18);
    const fuelType = pick(FUELS);
    const depreciation = Math.max(0.12, 1 - age * 0.07);
    const price = Math.round((basePrice * depreciation * (0.85 + random() * 0.3)) / 100) * 100;

    return {
      id: i + 1,
      brand,
      model: model.name,
      year: CURRENT_YEAR - age,
      price,
      mileage: age === 0 ? Math.round(random() * 50) * 100 : Math.round((age * (8000 + random() * 14000)) / 100) * 100,
      fuelType,
      bodyType: pick(model.bodyTypes),
      gearbox: fuelType === 'electric' || fuelType === 'hybrid' ? 'automatic' : pick(GEARBOXES),
      engineCapacity: fuelType === 'electric' ? 0 : pick([999, 1395, 1498, 1598, 1968, 1998, 2993]),
      city: pick(CITIES),
    };
  });
}

export const MOCK_CARS: Car[] = generateCars(300);
