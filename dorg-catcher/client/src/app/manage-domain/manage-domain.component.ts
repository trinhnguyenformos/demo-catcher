import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import {CatcherService} from '../catcher/catcher.service';

import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-manage-domain',
  templateUrl: './manage-domain.component.html',
  styleUrls: ['./manage-domain.component.css']
})
export class ManageDomainComponent implements OnInit {

  grid: any;

  constructor(private catcherService: CatcherService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.grid = {};
    this.initEmailSources();
  }

  initEmailSources() {
     var columnDefs = [
        { field: 'platform', headerName: 'Platform', sortable: true, filter: 'agTextColumnFilter'},
        { field: 'domainName', headerName: 'Domain Name', sortable: true, filter: 'agTextColumnFilter'},
        { field: 'createTime', headerName: 'Date Created', sortable: true, filter: false,
            cellRenderer: (data) => {
                return formatDate(data.value, 'yyyy-MM-dd hh:mm:ss ', this.locale);
            }
        },
        { field: 'active', headerName: 'Active', sortable: false, filter: false,
            cellRenderer: data => {
              return `<input type='checkbox' ${data.value ? 'checked' : ''} />`;
            }
        }
      ];

      this.grid.gridOptions = {
           defaultColDef: {
                resizable: true,
                filter: false
           },
           columnDefs: columnDefs,
           pagination: false,
           rowModelType: 'infinite',
           floatingFilter:true
      };

      this.grid.dataSource = {
          getRows: (params: IGetRowsParams) => {
              this.catcherService.getEmailSources().subscribe(rows => {
                console.log(rows);
                rows.forEach(row => {
                  if (row.applicationOriginType.name === 'DO') {
                    row.platform = 'DiscoverOrg';
                  } else if (row.applicationOriginType.name === 'ZI') {
                    row.platform = 'Zoom Info';
                  }
                  if (row.accountUsername) {
                    let index = row.accountUsername.indexOf( "@" );
                    if (index >= 0) {
                      row.domainName = row.accountUsername.substring(index+1)
                    }
                  }
                  console.log(row);
                });
                params.successCallback(rows,rows.length);
              })
          }
      }
      return this.grid;
   }

  onGridReady(params: any) {
    this.grid.gridApi = params.api;
    this.grid.gridApi.sizeColumnsToFit();
    this.grid.gridApi.setDatasource(this.grid.dataSource);
    this.grid.gridApi.setDomLayout('autoHeight');
  }
}
