import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ip-scan-tab',
  templateUrl: './ip-scan-tab.component.html',
  styleUrls: ['./ip-scan-tab.component.css']
})
export class IpScanTabComponent implements OnInit {
  sectionRow = {
    ipScan: {
      rows: [
        { downloadJob: 'Download Job' },
        { usageTrack: 'Usage Track' },
        { catcher: 'Catcher' },
        { senderAccount: 'senderAccount' },
        { platformUser: 'Platform User' }
      ]
    }
  }

  objectKeys = Object.keys;
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
