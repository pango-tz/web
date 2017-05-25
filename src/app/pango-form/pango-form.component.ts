import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export abstract class PangoFormComponent implements OnInit {

  ngOnInit(): void {
    this.buildForm();
  }

  public abstract buildForm();

  public abstract onSubmit();

  onValueChanged(data?: any, theForm?: FormGroup, formErrors?: any, validationMessages?: any) {
    if (!theForm) { return; }


    for (const field of Object.keys(formErrors)) {

      formErrors[field] = '';
      const control = theForm.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];

        for (const key of Object.keys(control.errors)) {
          formErrors[field] += messages[key] + ' ';
        }
      }

      formErrors[field].trim();
    }
  }

}

