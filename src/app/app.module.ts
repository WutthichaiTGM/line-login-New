import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environment/environment';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AngularFireModule.initializeApp(environment.firebaseApp), ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
