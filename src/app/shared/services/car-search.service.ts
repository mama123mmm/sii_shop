import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Car, SearchCriteria } from '../models/car';
import { CATALOG, MOCK_CARS } from './mock-cars';

/** Simulated network latency of the mock backend, in ms. */
const LATENCY = 250;

/**
 * Mock backend for car search. Everything is filtered in memory and returned
 * as a delayed Observable, so it can be swapped for HttpClient calls later
 * without changing the components.
 */
@Injectable({ providedIn: 'root' })
export class CarSearchService {
  getBrands(): Observable<string[]> {
    return of(Object.keys(CATALOG).sort()).pipe(delay(LATENCY));
  }

  getModels(brand: string): Observable<string[]> {
    const models = CATALOG[brand]?.models.map(m => m.name) ?? [];
    return of(models.sort()).pipe(delay(LATENCY));
  }

  count(criteria: SearchCriteria): Observable<number> {
    return of(this.filter(criteria).length).pipe(delay(LATENCY));
  }

  search(criteria: SearchCriteria): Observable<Car[]> {
    return of(this.filter(criteria)).pipe(delay(LATENCY));
  }

  private filter(c: SearchCriteria): Car[] {
    return MOCK_CARS.filter(car =>
      (!c.bodyType || car.bodyType === c.bodyType) &&
      (!c.brand || car.brand === c.brand) &&
      (!c.model || car.model === c.model) &&
      (!c.fuelType || car.fuelType === c.fuelType) &&
      (c.priceFrom == null || car.price >= c.priceFrom) &&
      (c.priceTo == null || car.price <= c.priceTo) &&
      (c.yearFrom == null || car.year >= c.yearFrom) &&
      (c.yearTo == null || car.year <= c.yearTo) &&
      (c.mileageTo == null || car.mileage <= c.mileageTo)
    );
  }
}
