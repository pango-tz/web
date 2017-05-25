import { Component, OnInit } from '@angular/core';
import { PageHeaderService } from '../pango-services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private pageHeaderService: PageHeaderService) { }

  ngOnInit() {
    this.pageHeaderService.setTitle('Register with Pango');
  }

}
