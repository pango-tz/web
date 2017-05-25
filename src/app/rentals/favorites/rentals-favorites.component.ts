import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { PageHeaderService } from '../../pango-services';

@Component({
  moduleId: module.id,
  selector: 'app-favorites-root',
  templateUrl: 'rentals-favorites.component.html',
  styleUrls: ['rentals-favorites.component.css']
})
export class RentalsFavoritesComponent implements OnInit{
  title = 'hello from favorites';

  constructor( private pageHeaderService: PageHeaderService ) {

  }

  ngOnInit() {
    this.pageHeaderService.setTitle('View My Favorites');
  }
}
