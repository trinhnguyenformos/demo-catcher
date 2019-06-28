import {Injectable} from '@angular/core';
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CatcherService {

  _domaintHitData: Observable<any>;

  constructor(private httpClient: HttpClient) { }
    getDomaintHitData(): Observable<any> {
        this._domaintHitData = this.httpClient.post(environment.serverUrl + 'catcher', '').pipe(publishReplay(), refCount());
      return this._domaintHitData;
    }
  
}
