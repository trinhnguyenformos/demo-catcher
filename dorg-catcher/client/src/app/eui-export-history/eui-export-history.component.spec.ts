import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EuiExportHistoryComponent } from './eui-export-history.component';

describe('EuiExportHistoryComponent', () => {
  let component: EuiExportHistoryComponent;
  let fixture: ComponentFixture<EuiExportHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuiExportHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuiExportHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
