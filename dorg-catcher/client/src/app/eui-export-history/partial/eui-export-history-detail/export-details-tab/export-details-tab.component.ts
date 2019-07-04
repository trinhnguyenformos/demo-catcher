import { Component, OnInit, Input } from '@angular/core';
import { EuiExportHistory } from '../../model/eui-export-history.modal';

@Component({
  selector: 'app-export-details-tab',
  templateUrl: './export-details-tab.component.html',
  styleUrls: ['./export-details-tab.component.css']
})
export class ExportDetailsTabComponent implements OnInit {

  sectionRow = {
    exportInfo: {
      rows: [
        { field: 'exportDate', name : 'Export Date/Time', default: ""},
        { field: 'clientIP', name : 'IP address', default: ""},
        { field: 'plantEmailSM', name : 'Plant email 1', default: ""},
        { field: 'plantEmailMed', name : 'Plant email 2', default: ""},
        { field: 'plantEmailLG', name : 'Plant email 3', default: ""},
        { field: 'count', name : 'Number of records', default: ""}
      ]
    }
  }

  objectKeys = Object.keys;
  @Input() data: EuiExportHistory;
  
  constructor() { }

  ngOnInit() {
  }

}
