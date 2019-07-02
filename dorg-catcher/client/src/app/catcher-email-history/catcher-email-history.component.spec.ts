import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcherEmailHistoryComponent } from './catcher-email-history.component';

describe('CatcherEmailHistoryComponent', () => {
  let component: CatcherEmailHistoryComponent;
  let fixture: ComponentFixture<CatcherEmailHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatcherEmailHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatcherEmailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
