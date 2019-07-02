import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpScanTabComponent } from './ip-scan-tab.component';

describe('IpScanTabComponent', () => {
  let component: IpScanTabComponent;
  let fixture: ComponentFixture<IpScanTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpScanTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpScanTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
