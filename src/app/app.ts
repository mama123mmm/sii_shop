import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
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

  get availableModels(): string[] {
    return this.modelsByBrand[this.selectedBrand] ?? [];
  }

  onBrandChange(event: Event): void {
    this.selectedBrand = (event.target as HTMLSelectElement).value;

    // Po zmianie marki czyścimy wcześniej wybrany model.
    this.selectedModel = '';
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
