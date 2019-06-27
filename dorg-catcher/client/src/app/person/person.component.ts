import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {PersonService} from './person.service';
import {Route, Router} from '@angular/router';
import {Person} from '../person';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

//  persons: Array<any>;
  serverUrl: string;
  personInfo: Person;
  isAddAction: boolean;
  persons: any = [];
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
    this.serverUrl = environment.serverUrl;
    this.personInfo = new Person();
    this.isAddAction = true;
    this.persons = this.getPersonGrid();
    this.refreshPersons();
    console.log("XXXX")
    console.log(this.persons)
  }
  
  refreshPersons() {
    this.personService.getPersonsData().subscribe(applicationData => {
      this.persons.data = applicationData.sort((a: any, b: any) => {
       if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }
  
  addPerson() {
    if (this.validatePerson(this.personInfo)) {
         this.personService.addPerson(this.personInfo).toPromise().then(
             () => {
                this.refreshPersons();
                this.clear();
             })
    }
  }
  
  deletePerSon(personId: number) {
    this.personService.deletePerson(personId);
    this.refreshPersons();
  }
  
  viewPerSon(person: Person) {
      this.personInfo = person;
      this.isAddAction = false;
  }
  
  clear() {
    this.personInfo = new Person();
    this.isAddAction = true;
  }
  
  updatePerson() {
    if (this.validatePerson(this.personInfo)) {
        this.personService.updatePerson(this.personInfo);
        this.refreshPersons();
        this.clear();
    }
  }
  
  validatePerson(person: Person): boolean {
    if (person) {
      return (person.personName != '' && person.age > 0 && person.gender != '')
    }
    return false;
  }
  
  getPersonGrid () {
//      var template = '<div class=\"ui-grid-cell-contents\">';
//      template = template + '<span>{{ COL_FIELD }}</span>';
//      template = template + '<privacy-requested-component ng-if=\"row.entity.privacyEuRequested\" entity=\"row.entity\"></privacy-requested-component></div>';
//      
//      var object = [
//          {
//              cellTemplate: template,
//              displayName: 'ID',
//              field: 'id',
//              visible: true,
//          },
//          {
//              cellTemplate: template,
//              displayName: 'Person Name',
//              field: 'personName',
//              visible: true,
//          },
//          {
//              cellTemplate: template,
//              displayName: 'Age',
//              field: 'age',
//              visible: true,
//          },
//          {
//              cellTemplate: template,
//              displayName: 'Gender',
//              field: 'gender',
//              visible: true,
//          }
//          ];
//      this.persons.columnDefs = object;
//      this.persons.totalItems = 5;
//      return this.persons;

      var object = [
    	    { prop: 'id', name: 'ID' },
    	    { prop: 'personName', name: 'Person Name', headerTemplate: this.hdrTpl},
    	    { prop: 'age', name: 'Age' },
    	    { prop: 'gender', name: 'Gender' }
      ]
      this.persons.columns = object;
      return this.persons;
  }
}
