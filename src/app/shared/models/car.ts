export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'lpg';
export type BodyType = 'sedan' | 'hatchback' | 'estate' | 'suv' | 'coupe';
export type Gearbox = 'manual' | 'automatic';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  bodyType: BodyType;
  gearbox: Gearbox;
  engineCapacity: number;
  city: string;
}

export interface SearchCriteria {
  bodyType?: BodyType;
  brand?: string;
  model?: string;
  fuelType?: FuelType;
  priceFrom?: number;
  priceTo?: number;
  yearFrom?: number;
  yearTo?: number;
  mileageTo?: number;
}

export const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
  { value: 'lpg', label: 'Petrol + LPG' },
];

export const BODY_TYPES: { value: BodyType; label: string }[] = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'estate', label: 'Estate' },
  { value: 'suv', label: 'SUV' },
  { value: 'coupe', label: 'Coupe' },
];

const NUMBER_KEYS = ['priceFrom', 'priceTo', 'yearFrom', 'yearTo', 'mileageTo'] as const;
const STRING_KEYS = ['bodyType', 'brand', 'model', 'fuelType'] as const;

/** Converts criteria to URL query params, dropping empty values. */
export function criteriaToParams(criteria: SearchCriteria): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(criteria)) {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  }
  return params;
}

/** Reads criteria back from URL query params, ignoring unknown or invalid values. */
export function paramsToCriteria(params: Record<string, string | undefined>): SearchCriteria {
  const criteria: Record<string, string | number> = {};
  for (const key of STRING_KEYS) {
    if (params[key]) {
      criteria[key] = params[key]!;
    }
  }
  for (const key of NUMBER_KEYS) {
    const value = Number(params[key]);
    if (params[key] && !Number.isNaN(value)) {
      criteria[key] = value;
    }
  }
  return criteria as SearchCriteria;
}
