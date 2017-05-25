import { Component } from '@angular/core';
import { RequestMethod } from '@angular/http';
@Component({
  moduleId: module.id,
  selector: 'app-messages-root',
  templateUrl: 'manage-messages.component.html',
  styleUrls: ['manage-messages.component.css']
})
export class ManageMessagesComponent {
  title = 'hello from manage messages';

  constructor() {

  }
}
