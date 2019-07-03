import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.css']
})
export class DetailsTabComponent implements OnInit {
  @Input() structure: any;
  @Input() data: any;
  objectKeys = Object.keys;
  constructor() { }

  ngOnInit() {
  }

}
