import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { PageHeaderService } from '../../pango-services';
@Component({
  moduleId: module.id,
  selector: 'app-alerts-root',
  templateUrl: 'rentals-alerts.component.html',
  styleUrls: ['rentals-alerts.component.css']
})
export class RentalsAlertsComponent implements OnInit {
  title = 'hello from alerts';

  constructor( private pageHeaderService: PageHeaderService) {

  }

  ngOnInit() {
    this.pageHeaderService.setTitle('View My Alerts');
  }
}
