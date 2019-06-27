import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {CatcherService} from './catcher.service';
import {Route, Router} from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-catcher',
  templateUrl: './catcher.component.html',
  styleUrls: ['./catcher.component.css']
})
export class CatcherComponent implements OnInit {

  serverUrl: string;
  domainHits: any = [];
  @ViewChild('hdrTpl')
  hdrTpl: TemplateRef<any>;

  constructor(private catcherService: CatcherService, private router: Router) { }

  ngOnInit(): void {
    this.serverUrl = environment.serverUrl;
    this.domainHits = this.getDomainHitHeader();
    this.initData();
  }
  
  initData() {
     this.domainHits.data = this.catcherService.getDomaintHitData();
    }
  getDomainHitHeader() {
	  var template = '<ng-template let-column="column" let-sort="sortFn">';
		  template += '<div ';
		  template += 'class="header-sort-span">';
		  template += '{{column.name}}';
		  template += '</div>';
		  template += '<div class="header-filter-span">';
		  template += '<input ';
		  template += 'type="text" />';
		  template += '</div>';
		  template += '</ng-template>';
      var object = [
    	    {},
            { prop: 'companyName', name: 'Person Name', headerTemplate: this.hdrTpl},
            { prop: 'companyDomain', name: 'Company Domain'},
            { prop: 'firstEmailDate', name: 'First Email Date'},
    	    { prop: 'lastEmailDate', name: 'Last Email Date'},
    	    { prop: 'sendCount', name: 'Send Count'},
    	    { prop: 'lastAction', name: 'Last Action'},
    	    { prop: 'clientStatus', name: 'Client Status'},
    	    { prop: 'grade', name: 'Grade'},
    	    { name: 'Actions' }
      ]
      this.domainHits.columns = object;
      return this.domainHits;
  }
}

