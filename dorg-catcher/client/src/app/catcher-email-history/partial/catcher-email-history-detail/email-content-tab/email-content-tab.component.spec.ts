import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContentTabComponent } from './email-content-tab.component';

describe('EmailContentTabComponent', () => {
  let component: EmailContentTabComponent;
  let fixture: ComponentFixture<EmailContentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailContentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailContentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
