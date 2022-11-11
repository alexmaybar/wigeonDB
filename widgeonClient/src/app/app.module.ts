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

@NgModule({
  declarations: [
    AppComponent,
    ResultsPanelComponent,
    ResultItemComponent,
    RequestPanelComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
