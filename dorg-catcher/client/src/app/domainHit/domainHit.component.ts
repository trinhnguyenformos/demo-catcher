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
        { field: 'clientStatus', headerName: 'Client Status', sortable: true, filter: 'agTextColumnFilter'},
        { field: 'grade', headerName: 'Grade', sortable: true, filter: 'agTextColumnFilter'},
        { headerName: "Action", cellRenderer: "actionRenderer", filter: false}
      ];
      
      this.domainHits.gridOptions = {
           defaultColDef: {
                resizable: true,
                filter: false
           },
           columnDefs: columnDefs,
           pagination: true,
           rowModelType: 'infinite',
           cacheBlockSize: 20,
           paginationPageSize: 5,
           floatingFilter:true
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
    this.domainHits.gridApi.setDomLayout('autoHeight');
  }
  
  onRowClicked(params: any) {
      alert("onRowClicked");
      console.log(params);
  }
  
  onFilterChanged(params: any) {
      alert("onFilterChanged");
      console.log(params);
  }
}

