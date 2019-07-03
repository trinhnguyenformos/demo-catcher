import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.css']
})
export class DetailsTabComponent implements OnInit {
  @Input() structure: any;
  @Input() data: any;
  objectKeys = Object.keys;
  isArray = _.isArray;
  sectionRow = {
    emailInformation: {
      rows: [
        { received: 'Received' },
        { plantEmail: 'Plant Email' },
        { senderDomain: 'Sender Domain' },
        { platform: 'Platform' },
        { sourceIps: 'Source Ips' }
      ]
    },
    userMatching: {
      rows: [
        { userId: 'User ID' },
        { emailUser: 'Email User' },
        { name: 'Name' },
        { userStatus: 'User Status' },
        { activeFrom: 'Active From' },
        { activeTo: 'Active To' },
        { exportLimit: 'Export Limit' }
      ]
    },
    accountMatching: {
      rows: [
        { accountId: 'Account ID' },
        { name: 'Name' },
        { accountStatus: 'Account Status' },
        { maxSeats: 'Max Seats' },
        { activeSeats: 'Active Seats' },
        { exportLimit: 'Export Limit' }
      ]
    }
  }

  constructor() { }

  ngOnInit() { }

}
