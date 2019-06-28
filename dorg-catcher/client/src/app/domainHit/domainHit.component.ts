import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {CatcherService} from '../catcher/catcher.service';
import {Route, Router} from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

import { environment } from '../../environments/environment';
import { ActionRenderer } from './partial/action-renderer.component';

@Component({
  selector: 'app-domainHit',
  templateUrl: './domainHit.component.html',
  styleUrls: ['./domainHit.component.css']
})
export class DomainHitComponent implements OnInit {

  serverUrl: string;
  domainHits: any = [];
  

  constructor(private catcherService: CatcherService, private router: Router) { }

  ngOnInit(): void {
    this.serverUrl = environment.serverUrl;
    this.initDomainHits();
  }
  
  initDomainHits() {
     this.domainHits.columns = [
        {headerName: "Company Name", field: "companyName",
            checkboxSelection: function (params) {
             return params.columnApi.getRowGroupColumns().length === 0;
            },
            headerCheckboxSelection: function (params) {
               return params.columnApi.getRowGroupColumns().length === 0;
            }, sortable: true, filter: true
        },
        { field: 'companyDomain', headerName: 'Company Domain', sortable: true, filter: true},
        { field: 'firstEmailDate', headerName: 'First Email Date', sortable: true, filter: true},
        { field: 'lastEmailDate', headerName: 'Last Email Date', sortable: true, filter: true},
        { field: 'sendCount', headerName: 'Send Count', sortable: true},
        { field: 'lastAction', headerName: 'Last Action', sortable: true},
        { field: 'clientStatus', headerName: 'Client Status', sortable: true, filter: true},
        { field: 'grade', headerName: 'Grade', sortable: true, filter: true},
        { headerName: "Action", cellRenderer: "actionRenderer"}
      ];
      
      this.domainHits.gridOptions = {
           pagination: true,
           rowModelType: 'infinite',
           cacheBlockSize: 20,
           paginationPageSize: 5
      };
      
      this.domainHits.frameworkComponents = {
          actionRenderer: ActionRenderer
      };
      
      this.domainHits.dataSource = {
          getRows: (params: IGetRowsParams) => {
              this.apiService().subscribe(data => {
                  params.successCallback(data,data.length);
              })
          }
      }
      return this.domainHits;
   }
  
  apiService() {
    return this.catcherService.getDomaintHitData();
  }
  
  onGridReady(params: any) {
    this.domainHits.gridApi = params.api;
    this.domainHits.gridApi.sizeColumnsToFit();
    this.domainHits.gridApi.setDatasource(this.domainHits.dataSource);
  }

}

