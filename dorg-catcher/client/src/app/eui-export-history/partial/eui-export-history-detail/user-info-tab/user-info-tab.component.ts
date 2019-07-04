import { EuiExportHistory } from './../../model/eui-export-history.modal';
import { Component, OnInit, Input } from "@angular/core";


@Component({
  selector: 'app-user-info-tab',
  templateUrl: './user-info-tab.component.html',
  styleUrls: ['./user-info-tab.component.css']
})
export class UserInfoTabComponent implements OnInit {

  sectionRow = {
    userInfo: {
      rows: [
        { field: 'userId', name : 'User ID', default: 108625},
        { field: 'platformUser', name : 'User Name', default: "jeff.cochran@adventtech.com"},
        { field: 'fullName', name : 'Name', default: "Jeffrey D. Cochran"},
        { field: 'status', name : 'User Status', default: "Active"},
        { field: 'activeFrom', name : 'Active From', default: "10/30/2018"},
        { field: 'activeTo', name : 'Active To', default: ""},
        { field: 'exportLimitForUser', name : 'Export Limit', default: "15,000"},
      ]
    },
    accountInfo: {
      rows: [
        { field: 'accountId', name : 'Account ID', default: 8061},
        { field: 'company', name : 'Name', default: "Advantage Technical Systems"},
        { field: 'accountStatus', name : 'Account Status', default: "Current (Active since 4/3/2017)"},
        { field: 'maxSeats', name : 'Max Seats', default: 161},
        { field: 'activeSeats', name : 'Active Seats', default: 161},
        { field: 'exportLimitForCompany', name : 'Export Limit', default: "500,000"},
      ]
    },
    accountContactInfo: {
      rows: [
        { field: 'contactName', name : 'Name', default: "Travis Clark"},
        { field: 'contactTitle', name : 'Title', default: "Business System Manager"},
        { field: 'contactPhone', name : 'Phone', default: "408-547-3784"},
        { field: 'contactEmail', name : 'Email', default: "ravis.clark@adventtech.com"},
        { field: 'contactDetails', name : 'Details', default: 161},
        { field: 'exportLimitForCompany', name : 'Export Limit', default: "17 Users,<br/>ENT, Mid, Gov<br/>Sales Rep Andrew Brewer"},
      ]
    }
  }

  objectKeys = Object.keys;
  @Input() data: EuiExportHistory;

  constructor() { }

  ngOnInit() {
  }

}
