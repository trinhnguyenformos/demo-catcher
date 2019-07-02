import { CatcherEmailHistory } from './../catcher-email-history/partial/model/CatcherEmailHistory';
import {Injectable} from '@angular/core';
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable()
export class CatcherService {

  _domaintHitData: Observable<any>;
  _catcherEmailHistoryData: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  getDomaintHitData(): Observable<any> {
    this._domaintHitData = this.httpClient.post(environment.serverUrl + 'catcher', '').pipe(publishReplay(), refCount());
    return this._domaintHitData;
  }

  getCatcherEmailHistoryData(): Observable<any> {
    this._domaintHitData = this.httpClient.post(environment.serverUrl + 'catcher-email-history', '').pipe(publishReplay(), refCount());
    return this._domaintHitData;
  }
  
  findCatcherEmailHistoryById(id): Observable<HttpResponse<CatcherEmailHistory>> {
    return this.httpClient.get<CatcherEmailHistory>(environment.serverUrl + 'catcher-email-history/' + id, { observe: 'response' });
  }

  getEmailSources(): Observable<any> {
    return this.httpClient.post(environment.serverUrl + 'email-sources', '').pipe(publishReplay(), refCount());
  }
}
