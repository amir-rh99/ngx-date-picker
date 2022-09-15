import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { AppComponent } from './app.component';
import { NgxDatePickerModule } from "../../lib/src/public-api"

import {
  ArticleComponent,
  DemoComponent
} from "./components"

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxDatePickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
