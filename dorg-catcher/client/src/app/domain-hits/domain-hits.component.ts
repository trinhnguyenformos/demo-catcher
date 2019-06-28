import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-domain-hits',
  templateUrl: './domain-hits.component.html',
  styleUrls: ['./domain-hits.component.css']
})
export class DomainHitsComponent implements OnInit {
  keepB = false;
  constructor() { }

  ngOnInit() {}

  toggleAreaB() {
    this.keepB = !this.keepB;
  }
}
