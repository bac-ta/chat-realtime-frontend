import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGroupsContentComponent } from './search-groups-content.component';

describe('SearchGroupsContentComponent', () => {
  let component: SearchGroupsContentComponent;
  let fixture: ComponentFixture<SearchGroupsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGroupsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGroupsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
