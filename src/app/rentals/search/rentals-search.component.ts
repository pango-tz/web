import { Component } from '@angular/core';
import { RequestMethod } from '@angular/http';
@Component({
  moduleId: module.id,
  selector: 'app-search-root',
  templateUrl: 'rentals-search.component.html',
  styleUrls: ['rentals-search.component.css']
})
export class RentalsSearchComponent {
  title = 'hello from search';

  constructor() {

  }
}
