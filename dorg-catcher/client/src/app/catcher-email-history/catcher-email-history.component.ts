import { EmailHistoryTypeRenderer } from './partial/renderer/email-history-type-renderer.component';
import { Component, OnInit } from '@angular/core';
import { IDatasource, IGetRowsParams, GridApi, _ } from 'ag-grid-community';
import {CatcherService} from '../catcher/catcher.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import * as lodash from 'lodash';

@Component({
  selector: 'app-catcher-email-histories',
  templateUrl: './catcher-email-history.component.html',
  styleUrls: ['./catcher-email-history.component.css']
})
export class CatcherEmailHistoryComponent implements OnInit {
  serverUrl: string;
  emailHistories: any = [];
  isShowDetails: boolean = false;
  catcherEmailHistoryId: number;

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
    this.rows = this.emailHistories.data;

  }

  getDomainHitHeader() {
    this.emailHistories.columns = [
      { field: 'type', headerName: '', cellRenderer: "emailHistoryTypeRenderer", filter: false, width: 80 },
      { field: 'companyName', headerName: 'Company Name', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'senderName', headerName: 'Sender Name', sortable: true, filter: 'agTextColumnFilter' },
      { field: 'userId', headerName: 'User ID', sortable: true, filter: 'agNumberColumnFilter' },
      { field: 'receivedDate', headerName: 'Received', sortable: true, filter: 'agDateColumnFilter'   },
      { field: 'sentToDomain', headerName: 'Sent To Domain', filter: 'agTextColumnFilter' },
      { field: 'fromAddress', headerName: 'Last Action', filter: 'agTextColumnFilter' },
      { field: 'platformUser', headerName: 'Client Status', sortable: true, filter: 'agTextColumnFilter'  },
      { field: 'grade', headerName: 'Grade', sortable: true, filter: true },
    ];
    
    this.emailHistories.gridOptions = {
      pagination: true,
      rowModelType: 'infinite',
      cacheBlockSize: 20,
      paginationPageSize: 5,
      floatingFilter: true,
      onSelectionChanged: this.onSelectionChanged
    };

    this.emailHistories.frameworkComponents = {
      emailHistoryTypeRenderer: EmailHistoryTypeRenderer
    };

    return this.emailHistories;
  }

  onSelectionChanged = () => {
    let selectedRows = this.emailHistories.gridOptions.api.getSelectedRows();
    if (!lodash.isEmpty(selectedRows)) {
      this.isShowDetails = true;
      this.catcherEmailHistoryId = selectedRows[0].id;
    }
   }

  apiService() {
    return this.catcherService.getCatcherEmailHistoryData();
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
