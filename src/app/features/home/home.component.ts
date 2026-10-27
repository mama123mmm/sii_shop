import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../../shared/components/search/search';
import { SearchCriteria, criteriaToParams } from '../../shared/models/car';

@Component({
  selector: 'app-home',
  imports: [Search],
  template: `
    <section class="hero">
      <h1>Find your next car</h1>
      <app-search (search)="onSearch($event)" />
    </section>
  `,
  styles: `
    .hero {
      max-width: 1100px;
      margin: 0 auto;
    }
  `,
})
export class HomeComponent {
  private router = inject(Router);

  onSearch(criteria: SearchCriteria): void {
    this.router.navigate(['/search'], { queryParams: criteriaToParams(criteria) });
  }
}
