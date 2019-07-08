import {Injectable} from '@angular/core';
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { ActionRenderer } from '../action-render/action-renderer.component';
import { SelectFloatingFilter } from "../select-floating-filter/select-floating-filter.component";

@Injectable()
export class AgGridCustomService {
    constructor() { }

    setupDomainHitsColumn(domainHitsVm) {
        var columnDefs = [
          {headerName: "Company Name", field: "companyName",
              checkboxSelection: function (params) {
               return params.columnApi.getRowGroupColumns().length === 0;
              },
              headerCheckboxSelection: function (params) {
                 return params.columnApi.getRowGroupColumns().length === 0;
              }, sortable: true, filter: 'agTextColumnFilter'
          },
          { field: 'companyDomain', headerName: 'Company Domain', sortable: true, filter: 'agTextColumnFilter'},
          { field: 'firstEmailDate', headerName: 'First Email Date', sortable: true, filter: 'agDateColumnFilter'},
          { field: 'lastEmailDate', headerName: 'Last Email Date', sortable: true, filter: 'agDateColumnFilter'},
          { field: 'sendCount', headerName: 'Send Count', sortable: true, filter: false},
          { field: 'lastAction', headerName: 'Last Action', sortable: true, filter: false},
          { field: 'clientStatus', headerName: 'Client Status', sortable: true, filter: "agTextColumnFilter",
              floatingFilterComponent: 'selectFloatingFilter',
              floatingFilterComponentParams: {
                  optionValues: this.getClientStatusFilterValue(),
                  suppressFilterButton: true
              },
              suppressMenu: true
          },
          { field: 'grade', headerName: 'Grade', sortable: true, filter: 'agTextColumnFilter',
              floatingFilterComponent: 'selectFloatingFilter',
              floatingFilterComponentParams: {
                  optionValues: this.getGradeFilterValue(),
                  suppressFilterButton: true
              },
              suppressMenu: true
           },
          { headerName: "Action", cellRenderer: "actionRenderer", filter: false}
        ];
        domainHitsVm.columnDefs = columnDefs;
        domainHitsVm.frameworkComponents = {
            actionRenderer: ActionRenderer,
            selectFloatingFilter: SelectFloatingFilter
        };
        return domainHitsVm;
    }
    
    getClientStatusFilterValue() {
        return [
            'Former',
            'Neither'
        ];
    };
    
    getGradeFilterValue() {
        return [
            'A','B','C','D'
        ];
    };
}
