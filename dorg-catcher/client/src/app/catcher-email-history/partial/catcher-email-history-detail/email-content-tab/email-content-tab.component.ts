import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-content-tab',
  templateUrl: './email-content-tab.component.html',
  styleUrls: ['./email-content-tab.component.css']
})
export class EmailContentTabComponent implements OnInit {
  sectionRow = {
    parsedSignature: {
      rows: [
        { name: 'Name' },
        { address: 'Address' },
        { city: 'City' },
        { stateRegion: 'State/Region' },
        { postalCode: 'Postal Code' },
        { phone1: 'Phone 1' },
        { phone2: 'Phone 2' }
      ]
    }
  }

  objectKeys = Object.keys;
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
