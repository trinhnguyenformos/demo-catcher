import {Injectable} from '@angular/core';
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CatcherService {

  _domaintHitData: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  getDomaintHitData() {
	  var domaintHitData  = [
		  {id : 1, companyName: 'Advanced Travel Partners', companyDomain: 'atpi.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '125', lastAction: '04/12/19', clientStatus: 'Neither', grade: 'B'},
		  {id : 2, companyName: 'Advanced EPM Consulting', companyDomain: 'advancedepm.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '148', lastAction: '04/12/19', clientStatus: 'Neither', grade: 'D'},
		  {id : 3, companyName: 'Advantage Business Media', companyDomain: 'advantagemedia.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '129', lastAction: '04/12/19', clientStatus: 'Current', grade: 'B'},
		  {id : 4, companyName: 'Advantage Technologies', companyDomain: 'atechnologies.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '137', lastAction: '04/12/19', clientStatus: 'Former', grade: 'C'},
		  {id : 5, companyName: 'Advanticom advanticom.com', companyDomain: 'atpi.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '110', lastAction: '04/12/19', clientStatus: 'Neither', grade: 'F'},
		  {id : 6, companyName: 'Advent Global Solutions', companyDomain: ' advocateinsiders.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '148', lastAction: '04/12/19', clientStatus: 'Neither', grade: 'D'},
		  {id : 7, companyName: 'Advocate', companyDomain: 'adventglobal.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '153', lastAction: '04/12/19', clientStatus: 'Former', grade: 'B'},
		  {id : 8, companyName: 'AeroFS', companyDomain: 'atpi.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '207', lastAction: '04/12/19', clientStatus: 'Neither', grade: 'C'},
		  {id : 9, companyName: 'Aerobyte', companyDomain: 'aerobyte.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '107', lastAction: '04/12/19', clientStatus: 'Former', grade: 'A'},
		  {id : 10, companyName: 'Aerohive Networks', companyDomain: 'aerohive.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '400', lastAction: '04/12/19', clientStatus: 'Neither', grade: 'D'},
          {id : 11, companyName: 'Affiliated Communications', companyDomain: 'affiliatedcom.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '150', lastAction: '04/12/19', clientStatus: 'Neither', grade: 'A'},
          {id : 12, companyName: 'Agari', companyDomain: 'agari.com', firstEmailDate: '05/02/18', lastEmailDate:'01/06/19', sendCount: '102', lastAction: '04/12/19', clientStatus: 'Former', grade: 'A'},
          ];
    return domaintHitData;
  }
  
}
