import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MarketsComponent } from './markets/markets.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'search/:id', component: ExplorerComponent },
  { path: 'markets', component: MarketsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
