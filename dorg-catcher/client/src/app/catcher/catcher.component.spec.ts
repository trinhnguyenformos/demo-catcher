/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CatcherComponent } from './catcher.component';
import { Observable, Observer } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { CatcherService } from './catcher.service';

describe('Component: Catcher', () => {

  const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'catcher', pathMatch: 'full'},
    {path: 'catcher', component: CatcherComponent}
  ];

  let component: CatcherComponent;

  const catcherService = {
    getDomaintHitData: () => {
      return Observable.create((observer: Observer<any>) => {
        observer.next({controllers: [{name: 'b'}, {name: 'a'}]});
        observer.complete();
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
    	  CatcherComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(rootRouterConfig)
      ],
      providers: [
        {provide: CatcherService, useValue: catcherService},
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    });

    let fixture = TestBed.createComponent(CatcherComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should initialize controllers with sorting', () => {
    component.ngOnInit();
    expect(component.controllers.length).toBe(2);
    expect(component.controllers[0].name).toBe('a');
    expect(component.controllers[1].name).toBe('b');
  });

  it('should determine if a route exists based on path', () => {
    expect(component.hasRoute('catcher')).toBe(true);
    expect(component.hasRoute('grails-angular')).toBe(false);
  });

});
