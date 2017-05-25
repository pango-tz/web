import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { PageHeaderService } from '../../pango-services';
@Component({
  moduleId: module.id,
  selector: 'app-alerts-root',
  templateUrl: 'manage-listings-add.component.html',
  styleUrls: ['manage-listings.component.css']
})
export class ManageListingsAddComponent implements OnInit {
  title = 'hello from manage listings Add';

  constructor(private pageHeaderService: PageHeaderService) {

  }

  ngOnInit() {
    this.pageHeaderService.setTitle('Add A Listing');
  }
}
