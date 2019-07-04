import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {DomainHitComponent} from "./domainHit/domainHit.component";
import {ManageDomainComponent} from "./manage-domain/manage-domain.component";
import { LoginComponent } from './login/login.component';
import { CatcherEmailHistoryComponent } from './catcher-email-history/catcher-email-history.component';
import { EuiExportHistoryComponent } from './eui-export-history/eui-export-history.component';
import { UsageTrackComponent } from './usage-track/usage-track.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'domainHit', component: DomainHitComponent},
  {path: 'manage-domain', component: ManageDomainComponent},
  {path: 'catcher-email-history', component: CatcherEmailHistoryComponent},
  {path: 'eui-export-history', component: EuiExportHistoryComponent},
  {path: 'usage-track', component: UsageTrackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
