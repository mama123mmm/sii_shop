import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Search } from './search';
import { SearchCriteria } from '../../models/car';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable model only after a brand is chosen', () => {
    expect(component.form.controls.model.disabled).toBeTrue();
    component.form.controls.brand.setValue('Audi');
    expect(component.form.controls.model.enabled).toBeTrue();
  });

  it('should load models of the chosen brand', fakeAsync(() => {
    component.form.controls.brand.setValue('Audi');
    tick(500);
    expect(component.models()).toEqual(['A3', 'A4', 'A6', 'Q5']);
  }));

  it('should emit only filled criteria on submit', () => {
    let emitted: SearchCriteria | undefined;
    component.search.subscribe(c => (emitted = c));

    component.form.controls.brand.setValue('BMW');
    component.form.controls.priceTo.setValue(100000);
    component.submit();

    expect(emitted).toEqual({ brand: 'BMW', priceTo: 100000 });
  });

  it('should update the live offer count when filters change', fakeAsync(() => {
    // created inside fakeAsync so the debounce timer is controlled by tick()
    const component = TestBed.createComponent(Search).componentInstance;
    tick(1000);
    expect(component.count()).toBeGreaterThan(0);

    component.form.controls.fuelType.setValue('electric');
    tick(1000);
    const electric = component.count()!;

    component.form.controls.fuelType.setValue('');
    tick(1000);

    expect(electric).toBeGreaterThan(0);
    expect(component.count()).toBeGreaterThan(electric);
  }));
});
