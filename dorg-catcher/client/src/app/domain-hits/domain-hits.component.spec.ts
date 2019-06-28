import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainHitsComponent } from './domain-hits.component';

describe('DomainHitsComponent', () => {
  let component: DomainHitsComponent;
  let fixture: ComponentFixture<DomainHitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainHitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainHitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
