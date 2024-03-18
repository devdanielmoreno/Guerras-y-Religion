import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-guerra-dialog',
  templateUrl: './guerra-dialog.component.html',
  styleUrls: ['./guerra-dialog.component.css']
})
export class GuerraDialogComponent {
  paisSeleccionado: any;
  guerras: any[];
  @ViewChild(MatSort) sort: MatSort = new MatSort;


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  constructor(public dialogRef: MatDialogRef<GuerraDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _liveAnnouncer: LiveAnnouncer) {
    this.paisSeleccionado = data.pais;
    this.guerras = data.guerras;
  }
}
