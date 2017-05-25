import { Component } from '@angular/core';
import { RequestMethod } from '@angular/http';
@Component({
  moduleId: module.id,
  selector: 'app-rentals-root',
  templateUrl: 'rentals.component.html',
  styleUrls: ['rentals.component.css']
})
export class RentalsComponent {
  title = 'app works!';

  readonly rentalsLinks: Array<any> = [
    {
      path: 'search',
      label: 'Search',
      icon: 'search'
    },
    {
      path: 'alerts',
      label: 'Alerts',
      icon: 'alert'
    },
    {
      path: 'favorites',
      label: 'Favorites',
      icon: 'heart'
    }
  ];

  constructor() {

  }
}
