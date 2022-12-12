import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './components/add-page/add-page.component';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { TimeWarpPageComponent } from './components/time-warp-page/time-warp-page.component';

const routes: Routes = [
  { path: 'home', component: AddPageComponent },
  { path: 'reports', component: ReportsPageComponent },
  { path: 'time-warp', component: TimeWarpPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
