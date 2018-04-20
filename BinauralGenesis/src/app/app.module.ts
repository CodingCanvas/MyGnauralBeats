import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig, MatButtonModule, MatSliderModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSidenavModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule, MatCardModule, MatSliderModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatCardModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
