import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientService } from './services/clients.service';
import { ResultsPanelComponent } from './components/results-panel/results-panel.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { RequestPanelComponent } from './components/request-panel/request-panel.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { DeletePageComponent } from './components/delete-page/delete-page.component';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsPanelComponent,
    ResultItemComponent,
    RequestPanelComponent,
    AddPageComponent,
    EditPageComponent,
    DeletePageComponent,
    ReportsPageComponent,
    InputFieldComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
