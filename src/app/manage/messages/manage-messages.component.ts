import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { PageHeaderService } from '../../pango-services';

@Component({
  moduleId: module.id,
  selector: 'app-messages-root',
  templateUrl: 'manage-messages.component.html',
  styleUrls: ['manage-messages.component.css']
})
export class ManageMessagesComponent implements OnInit {
  title = 'hello from manage messages';

  constructor(private pageHeaderService: PageHeaderService) {

  }

  ngOnInit() {
    this.pageHeaderService.setTitle('View My Messages');
  }
}
