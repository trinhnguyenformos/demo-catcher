import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {DomainHitComponent} from "./domainHit/domainHit.component";
import {ManageDomainComponent} from "./manage-domain/manage-domain.component";
import { DomainHitsComponent } from './domain-hits/domain-hits.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'domainHit', component: DomainHitComponent},
  {path: 'manage-domain', component: ManageDomainComponent},
  {path: 'domain-hits', component: DomainHitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}