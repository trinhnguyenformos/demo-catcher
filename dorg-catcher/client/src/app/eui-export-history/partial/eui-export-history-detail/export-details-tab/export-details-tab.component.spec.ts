import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportDetailsTabComponent } from './export-details-tab.component';

describe('ExportDetailsTabComponent', () => {
  let component: ExportDetailsTabComponent;
  let fixture: ComponentFixture<ExportDetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportDetailsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
