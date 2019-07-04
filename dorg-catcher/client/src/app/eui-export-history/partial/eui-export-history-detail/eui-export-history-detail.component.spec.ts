import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EuiExportHistoryDetailComponent } from './eui-export-history-detail.component';


describe('EuiExportHistoryDetailComponent', () => {
  let component: EuiExportHistoryDetailComponent;
  let fixture: ComponentFixture<EuiExportHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuiExportHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuiExportHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
