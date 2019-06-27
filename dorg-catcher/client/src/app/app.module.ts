import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { SideBarComponent } from './side-bar/side-bar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBuilding,
  faCoffee,
  faFileExport,
  faInbox, faListUl,
  faTags,
  faTools,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';
import { ManageDomainComponent } from './manage-domain/manage-domain.component';

library.add(faCoffee, faTags, faUsersCog, faInbox, faFileExport, faBuilding, faTools, faListUl);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    SideBarComponent,
    ManageDomainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
