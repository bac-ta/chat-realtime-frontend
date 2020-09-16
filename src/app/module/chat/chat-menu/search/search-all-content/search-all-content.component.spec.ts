import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAllContentComponent } from './search-all-content.component';

describe('SearchAllContentComponent', () => {
  let component: SearchAllContentComponent;
  let fixture: ComponentFixture<SearchAllContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAllContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAllContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
