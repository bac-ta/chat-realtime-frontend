import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserContentComponent } from './search-user-content.component';

describe('SearchUserContentComponent', () => {
  let component: SearchUserContentComponent;
  let fixture: ComponentFixture<SearchUserContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUserContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
