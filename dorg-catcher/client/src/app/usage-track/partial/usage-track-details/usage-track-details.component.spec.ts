import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageTrackDetailsComponent } from './usage-track-details.component';

describe('UsageTrackDetailsComponent', () => {
  let component: UsageTrackDetailsComponent;
  let fixture: ComponentFixture<UsageTrackDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageTrackDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageTrackDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
