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
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { ManageDomainComponent } from './manage-domain/manage-domain.component';
import { DomainHitsComponent } from './domain-hits/domain-hits.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ActionRenderer } from './domainHit/partial/action-renderer.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './domainHit/details/details.component';

// tslint:disable-next-line:max-line-length
library.add(faCoffee, faTags, faUsersCog, faInbox, faFileExport, faBuilding, faTools, faListUl, faTag, faPenAlt, faHistory, faEdit, faUserCog, faUserAlt, faLock, faTimesCircle);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    DomainHitComponent,
    SideBarComponent,
    ManageDomainComponent,
    DomainHitsComponent,
    TopBarComponent,
    ActionRenderer,
    LoginComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularSplitModule.forRoot(),
    AgGridModule,
    FontAwesomeModule
  ],
  entryComponents: [
    ActionRenderer
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, CatcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
