import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewRoomComponent } from './create-new-room.component';

describe('CreateNewRoomComponent', () => {
  let component: CreateNewRoomComponent;
  let fixture: ComponentFixture<CreateNewRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
