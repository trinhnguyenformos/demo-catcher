import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  DOMAIN_HIT_URL = "/domainHit";
  CATCHER_EMAIL_HISTORY_URL = "/catcher-email-history";
  EUI_EXPORT_HISTORY_URL = "/eui-export-history";
  USAGE_TRACK_URL = "/usage-track";
  MANAGE_DOMAIN_URL = "/manage-domain";

  currentUrl: string = "/domainHit";

  constructor(router: Router) {
    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit() {
  }

  selectMenu(pos: number) {

  }
}
