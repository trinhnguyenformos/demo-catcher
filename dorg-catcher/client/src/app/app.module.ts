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
import { PersonComponent } from './person/person.component';
import { PersonService } from './person/person.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CatcherComponent } from './catcher/catcher.component';
import { CatcherService } from './catcher/catcher.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    PersonComponent,
    CatcherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDatatableModule,
    NgbModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, PersonService, CatcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
