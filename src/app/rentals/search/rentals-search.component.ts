import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { PageHeaderService } from '../../pango-services';
@Component({
  moduleId: module.id,
  selector: 'app-search-root',
  templateUrl: 'rentals-search.component.html',
  styleUrls: ['rentals-search.component.css']
})
export class RentalsSearchComponent implements OnInit {
  title = 'hello from search';

  constructor(private pageHeaderService: PageHeaderService) {

  }

  ngOnInit() {
    this.pageHeaderService.setTitle('Search for Rental Properties');
  }
}
