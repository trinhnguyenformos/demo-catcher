import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-details-tab',
  templateUrl: './json-details-tab.component.html',
  styleUrls: ['./json-details-tab.component.css']
})
export class JsonDetailsTabComponent implements OnInit {

  constructor() { }
  jsonDetails: string;
  ngOnInit() {
    this.jsonDetails = `
      &nbsp;[<br>
        &nbsp;&nbsp;&nbsp;{"id":0,"displayName":"Employee Id"},<br>
        &nbsp;&nbsp;&nbsp;{"id":1,"displayName":"Full Name"},<br>
        &nbsp;&nbsp;&nbsp;{"id":2,"displayName":"First Name"},<br>
        &nbsp;&nbsp;&nbsp;{"id":3,"displayName":"Last name"},<br>
        &nbsp;&nbsp;&nbsp;{"id":4,"displayName":"Title"},<br>
        &nbsp;&nbsp;&nbsp;{"id":5,"displayName":"Seniority Level"},<br>
        &nbsp;&nbsp;&nbsp;{"id":6,"displayName":"Email"},<br>
        &nbsp;&nbsp;&nbsp;{"id":7,"displayName":"Direct Phone"},<br>
        &nbsp;&nbsp;&nbsp;{"id":8,"displayName":"Cell Phone"},<br>
        &nbsp;&nbsp;&nbsp;{"id":9,"displayName":"Reports To"},<br>
        &nbsp;&nbsp;&nbsp;{"id":10,"displayName":"Address 1"},<br>
        &nbsp;&nbsp;&nbsp;{"id":11,"displayName":"Address 2"},<br>
        &nbsp;&nbsp;&nbsp;{"id":12,"displayName":"CityisplayName":"State"},<br>
        &nbsp;&nbsp;&nbsp;{"id":14,"displayName":"Zip Code"},<br>
        &nbsp;&nbsp;&nbsp;{"id":15,"displayName":"Country"},<br>
        &nbsp;&nbsp;&nbsp;{"id":16,"displayName":"Twitter Link"},<br>
        &nbsp;&nbsp;&nbsp;{"id":17,"displayName":"LinkedIn URL"}<br>
      &nbsp;}`;
  }

}
