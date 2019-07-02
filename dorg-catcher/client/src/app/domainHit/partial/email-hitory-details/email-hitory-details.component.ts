import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmailHistoryTemp } from './email-hitory-details-temp.models';
import { SenderTemp } from './email-hitory-details-temp.models';
import { DownloadUserTemp } from './email-hitory-details-temp.models';

@Component({
  selector: 'email-history-details',
  templateUrl: './email-hitory-details.component.html',
  styleUrls: ['./email-hitory-details.component.css']
})
export class EmailHitoryDetailsComponent implements OnInit {
  @Output() closeDetails = new EventEmitter();
  @Input() id: string;
  constructor() { };
  emailHistoryTemp;
  downloadUserTemp;
  senderTemp;

  ngOnInit() {
    this.emailHistoryTemp = EmailHistoryTemp;
    this.senderTemp = SenderTemp
    this.downloadUserTemp = DownloadUserTemp
  }

  closingEmailHistoryDetails() {
    this.closeDetails.emit();
  }
}
