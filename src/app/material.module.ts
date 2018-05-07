import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
  
//todo: Can "GestureConfig" and "HammerJS" be included here instead of app.module?  Low-priority right now... but would be a touch more elegant, it seems.
import {
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material';



@NgModule({
  exports: [
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
})
export class MaterialModule { }
