import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonComponent } from './person/person.component';
import { PersonService } from './person/person.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CatcherComponent } from './catcher/catcher.component';
import { CatcherService } from './catcher/catcher.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AngularSplitModule } from 'angular-split';
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
import { DomainHitsComponent } from './domain-hits/domain-hits.component';
import { TopBarComponent } from './top-bar/top-bar.component';

library.add(faCoffee, faTags, faUsersCog, faInbox, faFileExport, faBuilding, faTools, faListUl);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    PersonComponent,
    CatcherComponent,
    SideBarComponent,
    ManageDomainComponent,
    DomainHitsComponent,
	TopBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDatatableModule,
    NgbModule.forRoot(),
    AngularSplitModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, PersonService, CatcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
