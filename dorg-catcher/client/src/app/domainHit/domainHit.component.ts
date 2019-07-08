import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {CatcherService} from '../catcher/catcher.service';
import {Route, Router} from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import { environment } from '../../environments/environment';
//import { ActionRenderer } from './partial/action-renderer.component';
import { SelectFloatingFilter } from "../ag-grid-custom/select-floating-filter/select-floating-filter.component";
import { AgGridCustomService } from "../ag-grid-custom/ag-grid/ag-grid.service";


@Component({
  selector: 'app-domainHit',
  templateUrl: './domainHit.component.html',
  styleUrls: ['./domainHit.component.css']
})
export class DomainHitComponent implements OnInit {

  serverUrl: string;
  domainHits: any = [];
  isShowDetails = false;

  constructor(private catcherService: CatcherService, private agGridCustomService: AgGridCustomService, private router: Router) { }

  ngOnInit(): void {
    this.serverUrl = environment.serverUrl;
    this.initDomainHits();
  }

  initDomainHits() {
	  this.domainHits = this.agGridCustomService.setupDomainHitsColumn(this.domainHits);
      this.domainHits.catcherService = this.catcherService;
      this.domainHits.getDataRow = function (params) {
          console.log("params")
          console.log(params)
          return this.catcherService.getDomaintHitData();
      }
      
      return this.domainHits;
   }

  showDetails(params: any) {
    this.isShowDetails = true;
  }

  closeDetails() {
    this.isShowDetails = false;
  }
}

