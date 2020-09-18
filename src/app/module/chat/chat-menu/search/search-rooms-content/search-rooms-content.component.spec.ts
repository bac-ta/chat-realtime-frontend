import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoomsContentComponent } from './search-rooms-content.component';

describe('SearchRoomsContentComponent', () => {
  let component: SearchRoomsContentComponent;
  let fixture: ComponentFixture<SearchRoomsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRoomsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoomsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
