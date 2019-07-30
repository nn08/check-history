import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { RecordComponent }  from './record.component';
import { RecordService } from './record.service';

@NgModule({
  imports: [
    BrowserModule,
		HttpModule,
		ReactiveFormsModule,

  ],
  declarations: [
        AppComponent,
		RecordComponent
  ],
  providers: [
        RecordService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
