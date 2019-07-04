import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageTrackComponent } from './usage-track.component';

describe('UsageTrackComponent', () => {
  let component: UsageTrackComponent;
  let fixture: ComponentFixture<UsageTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
