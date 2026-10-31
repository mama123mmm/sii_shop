import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatButton,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  types = ['Type 1', 'Type 2', 'Type 3'];
  car_makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
  car_models = ['Camry', 'Civic', 'F-150', 'Silverado', 'Altima'];
  car_types = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'];
  fuel_types = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
}
