import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PangoFormComponent } from './pango-form.component';

describe('PangoFormComponent', () => {
  let component: PangoFormComponent;
  let fixture: ComponentFixture<PangoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PangoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PangoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
