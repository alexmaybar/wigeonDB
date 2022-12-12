import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientService } from './services/clients.service';
import { ResultsPanelComponent } from './components/results-panel/results-panel.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TimeWarpPageComponent } from './components/time-warp-page/time-warp-page.component';
import { DisplayFieldComponent } from './components/display-field/display-field.component';
import { DisplayRowComponent } from './components/display-row/display-row.component';
import { EditRowComponent } from './components/edit-row/edit-row.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsPanelComponent,
    ResultItemComponent,
    AddPageComponent,
    ReportsPageComponent,
    InputFieldComponent,
    TimeWarpPageComponent,
    DisplayFieldComponent,
    DisplayRowComponent,
    EditRowComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
