import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperInputComponent } from './wrapper-input.component';

describe('WrapperInputComponent', () => {
  let component: WrapperInputComponent;
  let fixture: ComponentFixture<WrapperInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
