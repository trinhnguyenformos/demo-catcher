import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {DomainHitComponent} from "./domainHit/domainHit.component";
import {ManageDomainComponent} from "./manage-domain/manage-domain.component";
import { DomainHitsComponent } from './domain-hits/domain-hits.component';
import { LoginComponent } from './login/login.component';
import { CatcherEmailHistoryComponent } from './catcher-email-history/catcher-email-history.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'domainHit', component: DomainHitComponent},
  {path: 'manage-domain', component: ManageDomainComponent},
  {path: 'domain-hits', component: DomainHitsComponent},
  {path: 'catcher-email-history', component: CatcherEmailHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
