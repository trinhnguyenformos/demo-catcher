/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PersonComponent } from './person.component';
import { Observable, Observer } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { PersonService } from './person.service';

describe('Component: Person', () => {

  const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'person', pathMatch: 'full'},
    {path: 'person', component: PersonComponent}
  ];

  let component: PersonComponent;

  const personService = {
    getPersonsData: () => {
      return Observable.create((observer: Observer<any>) => {
        observer.next({controllers: [{name: 'b'}, {name: 'a'}]});
        observer.complete();
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(rootRouterConfig)
      ],
      providers: [
        {provide: PersonService, useValue: personService},
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    });

    let fixture = TestBed.createComponent(PersonComponent);
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
    expect(component.hasRoute('person')).toBe(true);
    expect(component.hasRoute('grails-angular')).toBe(false);
  });

});
