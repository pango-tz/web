import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { PageHeaderService } from '../../pango-services';
@Component({
  moduleId: module.id,
  selector: 'app-hold-requests-root',
  templateUrl: 'manage-hold-requests.component.html',
  styleUrls: ['manage-hold-requests.component.css']
})
export class ManageHoldRequestsComponent implements OnInit {
  title = 'hello from manage hold-requests';

  constructor(private pageHeaderService: PageHeaderService) {

  }

  ngOnInit() {
    this.pageHeaderService.setTitle('View My Hold Requests');
  }
}
