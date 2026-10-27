import { Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { BODY_TYPES, BodyType, FUEL_TYPES, FuelType, SearchCriteria } from '../../models/car';
import { CarSearchService } from '../../services/car-search.service';

const CURRENT_YEAR = 2026;

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private carSearch = inject(CarSearchService);
  private fb = inject(FormBuilder).nonNullable;

  /** Criteria to prefill the form with (e.g. read from the URL). */
  criteria = input<SearchCriteria>({});
  search = output<SearchCriteria>();

  readonly bodyTypes = BODY_TYPES;
  readonly fuelTypes = FUEL_TYPES;
  readonly years = Array.from({ length: CURRENT_YEAR - 1989 }, (_, i) => CURRENT_YEAR - i);
  readonly mileages = [10000, 25000, 50000, 75000, 100000, 150000, 200000, 250000];

  form = this.fb.group({
    bodyType: this.fb.control<BodyType | ''>(''),
    brand: '',
    model: this.fb.control({ value: '', disabled: true }),
    fuelType: this.fb.control<FuelType | ''>(''),
    priceFrom: this.fb.control<number | null>(null),
    priceTo: this.fb.control<number | null>(null),
    yearFrom: this.fb.control<number | null>(null),
    yearTo: this.fb.control<number | null>(null),
    mileageTo: this.fb.control<number | null>(null),
  });

  brands = toSignal(this.carSearch.getBrands(), { initialValue: [] });

  models = toSignal(
    this.form.controls.brand.valueChanges.pipe(
      startWith(this.form.controls.brand.value),
      distinctUntilChanged(),
      switchMap(brand => (brand ? this.carSearch.getModels(brand) : of([]))),
    ),
    { initialValue: [] },
  );

  /** Live number of matching offers, shown on the submit button. `null` while loading. */
  count = toSignal(
    this.form.valueChanges.pipe(
      startWith(null),
      debounceTime(300),
      map(() => this.toCriteria()),
      switchMap(criteria => this.carSearch.count(criteria).pipe(startWith(null))),
    ),
    { initialValue: null },
  );

  constructor() {
    this.form.controls.brand.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(brand => {
        const model = this.form.controls.model;
        model.reset('');
        brand ? model.enable({ emitEvent: false }) : model.disable({ emitEvent: false });
      });

    effect(() => {
      const c = this.criteria();
      // brand must be set before model, because changing brand resets the model
      this.form.reset({
        bodyType: c.bodyType ?? '',
        brand: c.brand ?? '',
        fuelType: c.fuelType ?? '',
        priceFrom: c.priceFrom ?? null,
        priceTo: c.priceTo ?? null,
        yearFrom: c.yearFrom ?? null,
        yearTo: c.yearTo ?? null,
        mileageTo: c.mileageTo ?? null,
      });
      this.form.controls.model.setValue(c.model ?? '');
    });
  }

  selectBodyType(bodyType: BodyType | ''): void {
    this.form.controls.bodyType.setValue(bodyType);
  }

  clear(): void {
    this.form.reset();
  }

  submit(): void {
    this.search.emit(this.toCriteria());
  }

  private toCriteria(): SearchCriteria {
    const criteria: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(this.form.getRawValue())) {
      if (value !== '' && value !== null) {
        criteria[key] = value;
      }
    }
    return criteria as SearchCriteria;
  }
}
