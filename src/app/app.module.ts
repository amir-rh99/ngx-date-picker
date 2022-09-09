import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxDatePickerModule } from "../../lib/src/public-api"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxDatePickerModule.forRoot({
      calendar: "gregorian",
      format: "DD-MM-YYYY"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
