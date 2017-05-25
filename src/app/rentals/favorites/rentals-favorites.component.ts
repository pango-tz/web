import { Component } from '@angular/core';
import { RequestMethod } from '@angular/http';
@Component({
  moduleId: module.id,
  selector: 'app-favorites-root',
  templateUrl: 'rentals-favorites.component.html',
  styleUrls: ['rentals-favorites.component.css']
})
export class RentalsFavoritesComponent {
  title = 'hello from favorites';

  constructor() {

  }
}
