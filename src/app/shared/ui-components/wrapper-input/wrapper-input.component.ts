import { Component, OnInit } from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
  selector: 'app-wrapper-input',
  templateUrl: './wrapper-input.component.html',
  styleUrls: ['./wrapper-input.component.sass']
})
export class WrapperInputComponent extends FieldWrapper implements OnInit  {

  constructor() {super();}

  ngOnInit(): void {
  }

}
