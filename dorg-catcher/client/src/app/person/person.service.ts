import {Injectable} from '@angular/core';
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Person} from '../person';

@Injectable()
export class PersonService {

  _personData: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  getPersonsData(): Observable<any> {
      this._personData = this.httpClient.get(environment.serverUrl + 'persons')
        .pipe(publishReplay(), refCount());
      console.log("yyyyyyy")
      console.log(this._personData)
    return this._personData;
  }
  
  addPerson(person: Person) : Observable<any> {
    if (person) {
        return this.httpClient.post(environment.serverUrl + 'persons', person);
    }
  }
  
  deletePerson(personId: number) {
    if (personId > 0) {
      this.httpClient.delete(environment.serverUrl + 'persons/' + personId).toPromise().then(
        () => {
           console.log("deletePerson done")
        }
      )
    }
  }
  
  updatePerson(person: Person) {
    if (person) {
      this.httpClient.put(environment.serverUrl + 'persons/' + person.id , person).toPromise().then(
         () => {
            console.log("updatePerson done")
        }
      )
    }
  }
}
