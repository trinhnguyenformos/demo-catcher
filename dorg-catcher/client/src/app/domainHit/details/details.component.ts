import { MESSAGE_DETAILS } from './details.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGetRowsParams } from 'ag-grid-community';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Output() closeDetails = new EventEmitter();
  @Input() id: string;
  grid: any;
  constructor() { };
  isShowSubDetails: boolean;
  subDetailId: number;

  ngOnInit() {
    this.grid = {};
    this.initGrid();
  }

  initGrid() {
    this.grid.gridOptions = {
      defaultColDef: {
        resizable: true,
        filter: false
      },
      columnDefs: this.initColumnDef(),
      pagination: true,
      rowModelType: 'infinite',
      cacheBlockSize: 20,
      paginationPageSize: 5,
      floatingFilter: true
    };

    this.grid.dataSource = {
      getRows: (params: IGetRowsParams) => {
        params.successCallback(MESSAGE_DETAILS, MESSAGE_DETAILS.length);
      }
    }
  }

  initColumnDef() {
    const columnDefs = [
      { headerName: 'Recieved', field: 'recieved', sortable: true },
      { headerName: 'Sender Name', field: 'senderName', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'User ID', field: 'userId', sortable: true, filter: 'agNumberColumnFilter' },
      { headerName: 'Sent To Domain', field: 'sentToDomain', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'From Address', field: 'fromAddress', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'Flatform User', field: 'flatformUser', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'Grade', field: 'grade', sortable: true, filter: 'agTextColumnFilter' },
    ];
    return columnDefs;
  }

  onGridReady(params: any) {
    this.grid.gridApi = params.api;
    this.grid.gridApi.sizeColumnsToFit();
    this.grid.gridApi.setDomLayout('autoHeight');
    this.grid.gridApi.setDatasource(this.grid.dataSource);
  }

  closingPanelDetails() {
    this.closeDetails.emit();
  }
  
  showSubDetails(params: any) {
    this.subDetailId = 1;
    this.isShowSubDetails = true;
  }
  
  closeDomainHitSubDetail() {
      this.isShowSubDetails = false;
  }
}
