import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  brands = ['Audi', 'BMW', 'Ford', 'Toyota', 'Volkswagen'];

  modelsByBrand: Record<string, string[]> = {
    Audi: ['A3', 'A4', 'A6', 'Q5'],
    BMW: ['Seria 1', 'Seria 3', 'Seria 5', 'X3'],
    Ford: ['Fiesta', 'Focus', 'Kuga', 'Puma'],
    Toyota: ['Corolla', 'RAV4', 'Yaris', 'C-HR'],
    Volkswagen: ['Golf', 'Passat', 'Tiguan', 'T-Roc'],
  };

  fuelTypes = [
    { value: 'PETROL', label: 'Benzyna' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'HYBRID', label: 'Hybryda' },
    { value: 'ELECTRIC', label: 'Elektryczny' },
    { value: 'LPG', label: 'LPG' },
  ];

  selectedBrand = '';
  selectedModel = '';
  selectedFuel = '';

  priceFrom: number | null = null;
  priceTo: number | null = null;
  yearFrom: number | null = null;
  yearTo: number | null = null;

  searchMessage = '';

  currentYear = new Date().getFullYear();

  brandQuery = '';
  modelQuery = '';

  showBrandSuggestions = false;
  showModelSuggestions = false;

  get filteredBrands(): string[] {
    const query = this.brandQuery.trim().toLowerCase();

    if (!query) {
      return this.brands;
    }

    return this.brands.filter(brand =>
      brand.toLowerCase().includes(query)
    );
  }

  get filteredModels(): string[] {
    const models = this.modelsByBrand[this.selectedBrand] ?? [];
    const query = this.modelQuery.trim().toLowerCase();

    if (!query) {
      return models;
    }

    return models.filter(model =>
      model.toLowerCase().includes(query)
    );
  }

  onBrandInput(): void {
    this.selectedBrand = '';
    this.selectedModel = '';
    this.modelQuery = '';
    this.showBrandSuggestions = true;
    this.showModelSuggestions = false;
  }

  selectBrand(brand: string): void {
    this.selectedBrand = brand;
    this.brandQuery = brand;
    this.selectedModel = '';
    this.modelQuery = '';
    this.showBrandSuggestions = false;
    this.showModelSuggestions = false;
  }

  onModelInput(): void {
    this.selectedModel = '';
    this.showModelSuggestions = true;
  }

  selectModel(model: string): void {
    this.selectedModel = model;
    this.modelQuery = model;
    this.showModelSuggestions = false;
  }

  search(): void {
    const criteria: string[] = [];

    if (this.selectedBrand) {
      criteria.push(`marka: ${this.selectedBrand}`);
    }

    if (this.selectedModel) {
      criteria.push(`model: ${this.selectedModel}`);
    }

    if (this.priceFrom !== null) {
      criteria.push(`cena od: ${this.priceFrom} zł`);
    }

    if (this.priceTo !== null) {
      criteria.push(`cena do: ${this.priceTo} zł`);
    }

    if (this.yearFrom !== null) {
      criteria.push(`rok od: ${this.yearFrom}`);
    }

    if (this.yearTo !== null) {
      criteria.push(`rok do: ${this.yearTo}`);
    }

    const fuel = this.fuelTypes.find((item) => item.value === this.selectedFuel);

    if (fuel) {
      criteria.push(`paliwo: ${fuel.label}`);
    }

    this.searchMessage =
      criteria.length > 0
        ? `Wybrane kryteria: ${criteria.join(', ')}.`
        : 'Nie wybrano żadnych kryteriów wyszukiwania.';
  }
}
