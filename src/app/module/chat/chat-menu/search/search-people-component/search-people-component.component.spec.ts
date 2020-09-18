import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeopleComponentComponent } from './search-people-component.component';

describe('SearchPeopleComponentComponent', () => {
  let component: SearchPeopleComponentComponent;
  let fixture: ComponentFixture<SearchPeopleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPeopleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPeopleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
