import { UserInfoTabComponent } from './user-info-tab.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

describe('UserInfoTabComponent', () => {
  let component: UserInfoTabComponent;
  let fixture: ComponentFixture<UserInfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
