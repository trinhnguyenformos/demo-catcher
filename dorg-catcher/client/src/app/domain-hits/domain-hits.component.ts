import { Component, OnInit } from '@angular/core';
import { IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import { CatcherService } from '../catcher/catcher.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-domain-hits',
  templateUrl: './domain-hits.component.html',
  styleUrls: ['./domain-hits.component.css']
})
export class DomainHitsComponent implements OnInit {
  serverUrl: string;
  domainHits: any = [];

  rows: any[];
  rowsOrig: any[];
  gridApi: GridApi;

  constructor(private catcherService: CatcherService) { }
  keepB = false;

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.apiService().subscribe(data => {
        console.log(data);
        params.successCallback(
          data,
          data.length
        );
      })
    }
  }

  toggleAreaB($event) {
    this.keepB = !this.keepB;
    // $(this).css('background-color', '#87ca8a');
    console.log($('.ag-row:nth-child(' + $event.rowIndex + ')'));
  }

  addHoverColor() {
    // $('.ag-row').mouseover(function() {
    //   $(this).css('background-color', 'red');
    // }).mouseout(function() {
    //   if ($(this).hasClass('ag-row-even')) {
    //     $(this).css('background-color', '#fcfdfe');
    //   } else {
    //     $(this).css('background-color', '#8aadd0');
    //   }
    // });
  }

  ngOnInit(): void {
    this.getDomainHitHeader();
    this.rows = this.domainHits.data;

  }

  getDomainHitHeader() {
    this.domainHits.columns = [
      {
        headerName: 'Company Name', field: 'companyName',
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        }, sortable: true, filter: true
      },
      { field: 'companyDomain', headerName: 'Company Domain', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'firstEmailDate', headerName: 'First Email Date', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'lastEmailDate', headerName: 'Last Email Date', sortable: true  },
      { field: 'sendCount', headerName: 'Send Count', filter: 'agNumberColumnFilter' },
      { field: 'lastAction', headerName: 'Last Action' },
      { field: 'clientStatus', headerName: 'Client Status', sortable: true },
      { field: 'grade', headerName: 'Grade', sortable: true, filter: true },
    ];
    this.domainHits.gridOptions = {
      pagination: true,
      rowModelType: 'infinite',
      cacheBlockSize: 20,
      paginationPageSize: 5,
      // getRowStyle: function(params) {
      //   if (params.node.rowIndex % 2 === 0) {
      //     return { background: '#8aadd0' };
      //   }
      // },
      floatingFilter: true
    };
    return this.domainHits;
  }

  apiService() {
    return this.catcherService.getDomaintHitData();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
    this.gridApi.setDomLayout('autoHeight');
  }
}
