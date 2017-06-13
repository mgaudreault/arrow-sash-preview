import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ColorPickerModule } from 'angular2-color-picker';

import { AppComponent }  from './app.component';
import { SashInformationsComponent } from './sash-informations.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ColorPickerModule,
  ],
  declarations: [
    AppComponent,
    SashInformationsComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
