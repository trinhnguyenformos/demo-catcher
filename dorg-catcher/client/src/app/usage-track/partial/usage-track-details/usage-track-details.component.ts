import { Component, OnInit, Input } from '@angular/core';
import { GridApi, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { CatcherService } from 'src/app/catcher/catcher.service';
import { EuiExportHistoryTypeRenderer } from 'src/app/eui-export-history/partial/renderer/eui-export-history-type-renderer.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-usage-track-details',
  templateUrl: './usage-track-details.component.html',
  styleUrls: ['./usage-track-details.component.css']
})
export class UsageTrackDetailsComponent implements OnInit {
  serverUrl: string;
  @Input() data: any = [];
  usageTracks: any = {};
  isShowDetails = false;

  rowsOrig: any[];
  gridApi: GridApi;

  constructor(private catcherService: CatcherService) { }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log(this.data);
      params.successCallback(
        this.data,
        this.data.length
      );
    }
  }

  ngOnInit(): void {
    this.getDomainHitHeader();

  }

  getDomainHitHeader() {
    this.usageTracks.columns = [
      { field: 'timestamp', headerName: 'Timestamp', sortable: true },
      { field: 'ipAddress', headerName: 'IP Address', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'action', headerName: 'Action', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'entityType', headerName: 'entityType', sortable: true, filter: 'agTextColumnFilter' }
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
      // this.usageTrackId = selectedRows[0].id;
    }
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
