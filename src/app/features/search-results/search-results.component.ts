import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { map, startWith, switchMap } from 'rxjs';
import { Search } from '../../shared/components/search/search';
import { Car, FUEL_TYPES, SearchCriteria, criteriaToParams, paramsToCriteria } from '../../shared/models/car';
import { CarSearchService } from '../../shared/services/car-search.service';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'mileage-asc';

const SORTERS: Record<SortOption, (a: Car, b: Car) => number> = {
  'newest': (a, b) => b.year - a.year,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'mileage-asc': (a, b) => a.mileage - b.mileage,
};

@Component({
  selector: 'app-search-results',
  imports: [Search, DecimalPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carSearch = inject(CarSearchService);

  criteria = toSignal(this.route.queryParams.pipe(map(paramsToCriteria)), { initialValue: {} });

  /** `null` while loading. */
  cars = toSignal(
    this.route.queryParams.pipe(
      map(paramsToCriteria),
      switchMap(criteria => this.carSearch.search(criteria).pipe(startWith(null))),
    ),
    { initialValue: null },
  );

  sort = signal<SortOption>('newest');

  sortedCars = computed(() => {
    const cars = this.cars();
    return cars ? [...cars].sort(SORTERS[this.sort()]) : null;
  });

  fuelLabel(car: Car): string {
    return FUEL_TYPES.find(f => f.value === car.fuelType)?.label ?? car.fuelType;
  }

  onSearch(criteria: SearchCriteria): void {
    this.router.navigate(['/search'], { queryParams: criteriaToParams(criteria) });
  }

  onSortChange(event: Event): void {
    this.sort.set((event.target as HTMLSelectElement).value as SortOption);
  }
}
