import { EuiExportHistoryTypeRenderer } from './partial/renderer/eui-export-history-type-renderer.component';
import { Component, OnInit } from '@angular/core';
import { IDatasource, IGetRowsParams, GridApi, _ } from 'ag-grid-community';
import { CatcherService } from '../catcher/catcher.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import * as lodash from 'lodash';

@Component({
  selector: 'app-eui-export-histories',
  templateUrl: './eui-export-history.component.html',
  styleUrls: ['./eui-export-history.component.css']
})
export class EuiExportHistoryComponent implements OnInit {
  serverUrl: string;
  euiExportHistories: any = [];
  isShowDetails: boolean = false;
  euiExportHistoryId: number;

  rows: any[];
  rowsOrig: any[];
  gridApi: GridApi;

  constructor(private catcherService: CatcherService) { }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.apiService().subscribe(data => {
        params.successCallback(
          data,
          data.length
        );
      })
    }
  }

  ngOnInit(): void {
    this.getDomainHitHeader();
    this.rows = this.euiExportHistories.data;

  }

  getDomainHitHeader() {
    this.euiExportHistories.columns = [
      { field: 'type', headerName: '', cellRenderer: 'euiExportHistoryTypeRenderer', filter: false, width: 80 },
      { field: 'platformUser', headerName: 'Platform User', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'userId', headerName: 'User ID', sortable: true, filter: 'agNumberColumnFilter' },
      { field: 'exportDate', headerName: 'Export Date/Time  ', sortable: true, filter: false },
      { field: 'count', headerName: 'Count', sortable: true, filter: false },
      { field: 'plantEmailSM', headerName: 'Plant Email SM', sortable: true, filter: false },
      { field: 'plantEmailMed', headerName: 'Plant Email Med', sortable: true, filter: false },
      { field: 'plantEmailLG', headerName: 'Plant Email LG', sortable: true, filter: false },
      { field: 'clientIP', headerName: 'Client IP', sortable: true, filter: false },
      { field: 'companyName', headerName: 'Company Name', sortable: true, filter: 'agTextColumnFilter' },
    ];

    this.euiExportHistories.gridOptions = {
      pagination: true,
      rowModelType: 'infinite',
      cacheBlockSize: 20,
      paginationPageSize: 5,
      floatingFilter: true,
      onSelectionChanged: this.onSelectionChanged
    };

    this.euiExportHistories.frameworkComponents = {
      euiExportHistoryTypeRenderer: EuiExportHistoryTypeRenderer
    };

    return this.euiExportHistories;
  }

  onSelectionChanged = () => {
    let selectedRows = this.euiExportHistories.gridOptions.api.getSelectedRows();
    if (!lodash.isEmpty(selectedRows)) {
      this.isShowDetails = true;
      this.euiExportHistoryId = selectedRows[0].id;
    }
  }

  apiService() {
    return this.catcherService.getEuiExportHistoryData();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
    this.gridApi.setDomLayout('autoHeight');
  }

  closeDetails() {
    this.isShowDetails = false;
  }
}
