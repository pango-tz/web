import { Component } from '@angular/core';
import { RequestMethod } from '@angular/http';
@Component({
  moduleId: module.id,
  selector: 'app-rentals-root',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css']
})
export class ManageComponent {
  title = 'app works!';

  readonly manageLinks: Array<any> = [
    {
      path: 'listings',
      label: 'Listings'
    },
    {
      path: 'messages',
      label: 'Messages'
    },
    {
      path: 'hold-requests',
      label: 'Hold Requests'
    }
  ];

  constructor() {

  }
}
