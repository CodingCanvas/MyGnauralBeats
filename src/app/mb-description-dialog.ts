import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
    selector: 'mb-description-dialog',
    templateUrl: 'mb-description-dialog.html',
  })
  export class MBDescriptionDialog {
  
    constructor(
      public dialogRef: MatDialogRef<MBDescriptionDialog>) { }
  
    onCloseClick(): void {
      this.dialogRef.close();
    }
}