import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Route, Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

@Component({
  selector: 'ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridCustomComponent implements OnInit {
    @Input() agGridVm: any = [];
    @Output() rowclick = new EventEmitter();
    
    constructor() { }

    ngOnInit(): void {
        this.agGridVm.paginationPageSize = 10
        this.agGridVm.paginationPageSizes = [5, 10, 25, 50, 75, 100];
        this.agGridVm.paginationLoaded = false;
        this.setupGridVm();
    }
    
    setupGridVm() {
        if (this.agGridVm.columnDefs == null || this.agGridVm.columnDefs== undefined ) {
            this.agGridVm.columnDefs = [];
        }
        
        if (this.agGridVm.frameworkComponents == null || this.agGridVm.frameworkComponents== undefined ) {
            this.agGridVm.frameworkComponents = {};
        }
        
        this.agGridVm.gridOptions = {
            defaultColDef: {
                 resizable: true,
                 filter: false
            },
            columnDefs: this.agGridVm.columnDefs,
            rowModelType: 'infinite',
            floatingFilter:true,
            pagination: true,
            cacheBlockSize: this.agGridVm.paginationPageSize,
            paginationPageSize: this.agGridVm.paginationPageSize,
            suppressPaginationPanel: true,
            suppressScrollOnNewData: true
            
       };
        
        this.agGridVm.dataSource = {
            getRows: (params: IGetRowsParams) => {
               this.getDataRow(params).subscribe(data => {
                   this.agGridVm.paginationLoaded = false;
                   params.successCallback(data,data.length);
                   console.log("XXXXXXXXXXXXXXXXX")
                   this.agGridVm.gridOptions.onPaginationChanged = this.onPaginationChanged();
                })
            }
        }
        return this.agGridVm;
    }
    
    onGridReady(params: any) {
        this.agGridVm.gridApi = params.api;
        this.agGridVm.gridApi.sizeColumnsToFit();
        this.agGridVm.gridApi.setDatasource(this.agGridVm.dataSource);
        this.agGridVm.gridApi.setDomLayout('autoHeight');
    }
    
    getDataRow(params: any) {
        return this.agGridVm.getDataRow(params);
    }
    
    onPaginationChanged() {
        if (this.agGridVm.gridOptions) {
            this.agGridVm.pagination = this.agGridVm.gridOptions.api;
            this.agGridVm.pagination.pages = [];
            
            for (var i = 0; i < this.agGridVm.gridOptions.api.paginationGetTotalPages(); i++) { 
                this.agGridVm.pagination.pages.push(i);
            }
            
            this.agGridVm.paginationLoaded = true;
        }
    }
    
    changedPageSize() {
        let value = (this.agGridVm.paginationPageSize === '') ? '100' : this.agGridVm.paginationPageSize;
        this.agGridVm.gridOptions.api.paginationSetPageSize(Number(value));
        this.onPaginationChanged();
    }
    
    paginationGoToPage(page) {
        this.agGridVm.gridOptions.api.paginationGoToPage(page);
    }
    
    paginationNextPage() {
        var currentPage =  this.agGridVm.gridOptions.api.paginationGetCurrentPage();
        if (currentPage < (this.agGridVm.gridOptions.api.paginationGetTotalPages() - 1)) {
            this.paginationGoToPage(currentPage + 1);
        }
    }
    
    paginationPreviousPage() {
        var currentPage =  this.agGridVm.gridOptions.api.paginationGetCurrentPage();
        if (currentPage > 0) {
            this.paginationGoToPage(currentPage - 1);
        }
        
    }
    
    rowClickedEvent() {
        this.rowclick.emit();
    }
}

