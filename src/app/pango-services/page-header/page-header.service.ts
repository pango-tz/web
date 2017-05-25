import {Injectable} from '@angular/core';
import {Title, Meta, MetaDefinition} from '@angular/platform-browser';

@Injectable()
export class PageHeaderService {

  constructor(private titleService: Title) {

  }
  setTitle(title: string) {
    this.titleService.setTitle(`Pango - ${title}`);
  }
}
