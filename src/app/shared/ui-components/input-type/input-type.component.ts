import {Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
  selector: 'app-input-type',
  templateUrl: './input-type.component.html',
  styleUrls: ['./input-type.component.sass']
})
export class InputTypeComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
