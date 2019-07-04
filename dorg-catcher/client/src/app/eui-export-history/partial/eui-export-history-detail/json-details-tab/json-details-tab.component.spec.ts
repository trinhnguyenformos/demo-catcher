import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDetailsTabComponent } from './json-details-tab.component';

describe('EmailContentTabComponent', () => {
  let component: JsonDetailsTabComponent;
  let fixture: ComponentFixture<JsonDetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonDetailsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
