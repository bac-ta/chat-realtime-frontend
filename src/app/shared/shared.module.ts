import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTypeComponent} from './ui-components/input-type/input-type.component';
import {WrapperInputComponent} from './ui-components/wrapper-input/wrapper-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {config} from './ui-components/config';
import {FormlyPrimeNGModule} from '@ngx-formly/primeng';
import {ButtonModule, InputTextareaModule, InputTextModule, OverlayPanelModule, TabViewModule, TooltipModule} from 'primeng';
import {RippleModule} from 'primeng/ripple';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { TrimPipe } from './pipes/trim.pipe';


@NgModule({
  declarations: [
    InputTypeComponent,
    WrapperInputComponent,
    FormatDatePipe,
    TrimPipe
  ],
  imports: [
    CommonModule,
    FormlyModule.forRoot(config),
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    FormlyModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    TabViewModule,
    PickerModule,
    EmojiModule,
    OverlayPanelModule,
    InputTextareaModule,
    TooltipModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    TabViewModule,
    PickerModule,
    EmojiModule,
    OverlayPanelModule,
    InputTextareaModule,
    TooltipModule,
    FormatDatePipe, TrimPipe
  ]
})
export class SharedModule { }
