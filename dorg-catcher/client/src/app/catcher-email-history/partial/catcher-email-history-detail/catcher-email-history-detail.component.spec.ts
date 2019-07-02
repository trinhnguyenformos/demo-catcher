import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcherEmailHistoryDetailComponent } from './catcher-email-history-detail.component';

describe('CatcherEmailHistoryDetailComponent', () => {
  let component: CatcherEmailHistoryDetailComponent;
  let fixture: ComponentFixture<CatcherEmailHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatcherEmailHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatcherEmailHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
