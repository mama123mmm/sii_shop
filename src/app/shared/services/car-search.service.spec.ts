import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CarSearchService } from './car-search.service';
import { Car } from '../models/car';

describe('CarSearchService', () => {
  let service: CarSearchService;

  beforeEach(() => {
    service = TestBed.inject(CarSearchService);
  });

  it('should filter by brand, price and year', fakeAsync(() => {
    let cars: Car[] = [];
    service.search({ brand: 'Toyota', priceTo: 80000, yearFrom: 2015 }).subscribe(c => (cars = c));
    tick(500);

    expect(cars.length).toBeGreaterThan(0);
    for (const car of cars) {
      expect(car.brand).toBe('Toyota');
      expect(car.price).toBeLessThanOrEqual(80000);
      expect(car.year).toBeGreaterThanOrEqual(2015);
    }
  }));

  it('should count the same offers it returns', fakeAsync(() => {
    let count = -1;
    let cars: Car[] = [];
    service.count({ fuelType: 'diesel' }).subscribe(c => (count = c));
    service.search({ fuelType: 'diesel' }).subscribe(c => (cars = c));
    tick(500);

    expect(count).toBe(cars.length);
  }));
});
