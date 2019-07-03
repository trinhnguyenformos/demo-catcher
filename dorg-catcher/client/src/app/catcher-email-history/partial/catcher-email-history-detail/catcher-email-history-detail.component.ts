import { STRUCTURE } from './structure.mapping';
import { CatcherEmailHistory } from './../model/CatcherEmailHistory';
import { CatcherService } from './../../../catcher/catcher.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-catcher-email-history-detail',
  templateUrl: './catcher-email-history-detail.component.html',
  styleUrls: ['./catcher-email-history-detail.component.css']
})
export class CatcherEmailHistoryDetailComponent implements OnInit, OnChanges {
  @Input() catcherEmailHistoryId: number;
  @Output() closeDetails = new EventEmitter();
  objectKeys = Object.keys;
  key = 'detailsTab';
  tabs = {
    detailsTab: 'Details',
    emailContentTab: 'Email Content',
    ipScanTab: 'IP Scan'
  };
  structure = STRUCTURE;

  entity: CatcherEmailHistory = new CatcherEmailHistory();

  constructor(private catcherService: CatcherService) {}

  ngOnChanges(changes: SimpleChanges) {
    const simpleChangeId: SimpleChange = changes.catcherEmailHistoryId;
    if (simpleChangeId.currentValue) {
      this.catcherService.findCatcherEmailHistoryById(simpleChangeId.currentValue).subscribe((res) => {
        this.entity = res.body;
      });
    }
  }

  ngOnInit() {

  }

  closingPanelDetails() {
    this.closeDetails.emit();
  }

  activeTab(key: string) {
    this.key = key;
    console.log(this.entity);
  }
}
