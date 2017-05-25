import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { PageHeaderService } from '../../pango-services';

@Component({
  moduleId: module.id,
  selector: 'app-alerts-root',
  templateUrl: 'manage-listings.component.html',
  styleUrls: ['manage-listings.component.css']
})
export class ManageListingsComponent implements OnInit {
  title = 'hello from manage listings';

  constructor(private pageHeaderService: PageHeaderService) {

  }

  ngOnInit() {
    this.pageHeaderService.setTitle('View My Listings');
  }
}
