import { EuiExportHistory } from '../model/eui-export-history.modal';
import { CatcherService } from '../../../catcher/catcher.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-eui-export-history-detail',
  templateUrl: './eui-export-history-detail.component.html',
  styleUrls: ['./eui-export-history-detail.component.css']
})
export class EuiExportHistoryDetailComponent implements OnInit, OnChanges {
  @Input() euiExportHistoryId: number;
  @Output() closeDetails = new EventEmitter();

  objectKeys = Object.keys;
  activeTabKey = 'detailsTab';
  tabs = {
    detailsTab: 'User Info',
    emailContentTab: 'Export Details',
    ipScanTab: 'JSON'
  };

  entity: EuiExportHistory = new EuiExportHistory();
  
  constructor(private catcherService: CatcherService) {}

  ngOnChanges(changes: SimpleChanges) {
    const simpleChangeId: SimpleChange = changes.euiExportHistoryId;
    if (simpleChangeId.currentValue) {
      this.catcherService.findEuiExportHistoryById(simpleChangeId.currentValue).subscribe((res) => {
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
    this.activeTabKey = key;
  }
}
