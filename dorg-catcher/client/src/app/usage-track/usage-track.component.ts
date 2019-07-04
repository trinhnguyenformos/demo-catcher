import { Component, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { GridApi, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { CatcherService } from '../catcher/catcher.service';
import { EuiExportHistoryTypeRenderer } from '../eui-export-history/partial/renderer/eui-export-history-type-renderer.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-usage-track',
  templateUrl: './usage-track.component.html',
  styleUrls: ['./usage-track.component.css']
})
export class UsageTrackComponent implements OnInit {
  serverUrl: string;
  usageTracks: any = [];
  usageTrackDetails: any = [];
  isShowDetails: boolean = false;
  usageTrackId: number;
  entity: any;

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
    this.rows = this.usageTracks.data;

  }

  getDomainHitHeader() {
    this.usageTracks.columns = [
      { field: 'platformUser', headerName: 'Platform User', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'userId', headerName: 'User ID', sortable: true, filter: 'agNumberColumnFilter' },
      { field: 'eventDate', headerName: 'Event Date', sortable: true, filter: false },
      { field: 'updateTime', headerName: 'Update Time', sortable: true, filter: false },
      { field: 'clientIp', headerName: 'Client IP', sortable: true, filter: false },
      { field: 'companyName', headerName: 'Company Name', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'eventCount', headerName: 'Event Count', sortable: true }
    ];

    this.usageTracks.gridOptions = {
      pagination: true,
      rowModelType: 'infinite',
      cacheBlockSize: 20,
      paginationPageSize: 5,
      floatingFilter: true,
      onSelectionChanged: this.onSelectionChanged
    };

    this.usageTracks.frameworkComponents = {
      euiExportHistoryTypeRenderer: EuiExportHistoryTypeRenderer
    };

    return this.usageTracks;
  }

  onSelectionChanged = () => {
    let selectedRows = this.usageTracks.gridOptions.api.getSelectedRows();
    if (!_.isEmpty(selectedRows)) {
      this.isShowDetails = true;
      this.usageTrackId = selectedRows[0].id;
      this.catcherService.findUsageTrackDownloadJobById(selectedRows[0].id).subscribe(response => {
        this.usageTrackDetails = response.body;
      })
    }
  }

  apiService() {
    return this.catcherService.getUsageTrackDownloadJob();
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
