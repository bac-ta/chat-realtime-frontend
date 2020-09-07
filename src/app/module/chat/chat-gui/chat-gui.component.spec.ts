import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGuiComponent } from './chat-gui.component';

describe('ChatGuiComponent', () => {
  let component: ChatGuiComponent;
  let fixture: ComponentFixture<ChatGuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
