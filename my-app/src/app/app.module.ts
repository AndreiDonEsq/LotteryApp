import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TicketComponent } from './ticket/ticket.component';
import { LotteryBoxComponent } from './lottery-box/lottery-box.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LotteryBoxComponent,
    TicketComponent,
    FooterComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
