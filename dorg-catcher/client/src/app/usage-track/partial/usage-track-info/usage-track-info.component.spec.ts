import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageTrackInfoComponent } from './usage-track-info.component';

describe('UsageTrackInfoComponent', () => {
  let component: UsageTrackInfoComponent;
  let fixture: ComponentFixture<UsageTrackInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageTrackInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageTrackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
