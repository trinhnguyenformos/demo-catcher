import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { CatcherService } from './catcher/catcher.service';
import { DomainHitComponent} from "./domainHit/domainHit.component";
import { AgGridModule} from "ag-grid-angular/main";
import { SideBarComponent } from './side-bar/side-bar.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AngularSplitModule } from 'angular-split';
import {
  faBuilding,
  faCoffee,
  faFileExport,
  faInbox, faListUl,
  faTags,
  faTools,
  faUsersCog,
  faTag,
  faPenAlt,
  faHistory,
  faEdit,
  faUserCog,
  faUserAlt,
  faLock,
  faTimesCircle,
  faArrowsAlt,
  faExternalLinkSquareAlt,
  faCalendarAlt,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { ManageDomainComponent } from './manage-domain/manage-domain.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ActionRenderer } from './domainHit/partial/action-renderer.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './domainHit/details/details.component';
import { CatcherEmailHistoryDetailComponent } from './catcher-email-history/partial/catcher-email-history-detail/catcher-email-history-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailHistoryTypeRenderer } from './catcher-email-history/partial/renderer/email-history-type-renderer.component';
import { CatcherEmailHistoryComponent } from './catcher-email-history/catcher-email-history.component';
import { IpScanTabComponent } from './catcher-email-history/partial/catcher-email-history-detail/ip-scan-tab/ip-scan-tab.component';
import { EmailContentTabComponent } from './catcher-email-history/partial/catcher-email-history-detail/email-content-tab/email-content-tab.component';
import { DetailsTabComponent } from './catcher-email-history/partial/catcher-email-history-detail/details-tab/details-tab.component';
import { EmailHitoryDetailsComponent } from './domainHit/partial/email-hitory-details/email-hitory-details.component';
import { EuiExportHistoryModule } from './eui-export-history/eui-export-history.module.';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SelectFloatingFilter } from "./ag-grid-custom/select-floating-filter/select-floating-filter.component";
import { UsageTrackDetailsComponent } from './usage-track/partial/usage-track-details/usage-track-details.component';
import { UsageTrackComponent } from './usage-track/usage-track.component';
import { UsageTrackInfoComponent } from './usage-track/partial/usage-track-info/usage-track-info.component';


// tslint:disable-next-line:max-line-length
library.add(faCoffee, faTags, faUsersCog, faInbox, faFileExport, faBuilding, faTools, faListUl, faTag, faPenAlt, faHistory, faEdit, faUserCog, faUserAlt, faLock, faTimesCircle, faArrowsAlt, faExternalLinkSquareAlt, faCalendarAlt, faCalendar);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    DomainHitComponent,
    SideBarComponent,
    ManageDomainComponent,
    TopBarComponent,
    ActionRenderer,
    LoginComponent,
    EmailHistoryTypeRenderer,
    CatcherEmailHistoryComponent,
    CatcherEmailHistoryDetailComponent,
    DetailsComponent,
    DetailsTabComponent,
    EmailContentTabComponent,
    IpScanTabComponent,
    EmailHitoryDetailsComponent,
    SelectFloatingFilter,
    EmailHitoryDetailsComponent,
    UsageTrackComponent,
    UsageTrackDetailsComponent,
    UsageTrackInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularSplitModule.forRoot(),
    AgGridModule,
    MatTabsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    EuiExportHistoryModule,
    FontAwesomeModule,
    AgGridModule.withComponents([SelectFloatingFilter])
  ],
  entryComponents: [
    ActionRenderer,
    EmailHistoryTypeRenderer
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, CatcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
