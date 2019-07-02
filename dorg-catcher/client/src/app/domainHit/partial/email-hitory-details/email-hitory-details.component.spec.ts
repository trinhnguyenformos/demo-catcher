import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHitoryDetails } from './email-hitory-details.component';

describe('EmailHitoryDetailsComponent', () => {
  let component: EmailHitoryDetails;
  let fixture: ComponentFixture<EmailHitoryDetails>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailHitoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailHitoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
