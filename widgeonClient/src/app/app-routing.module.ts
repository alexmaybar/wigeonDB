import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './components/add-page/add-page.component';
import { DeletePageComponent } from './components/delete-page/delete-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { RequestPanelComponent } from './components/request-panel/request-panel.component';

const routes: Routes = [
  { path: 'add', component: AddPageComponent },
  { path: 'edit', component: EditPageComponent },
  { path: 'delete', component: DeletePageComponent },
  { path: 'reports', component: ReportsPageComponent },
  { path: 'request', component: RequestPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
