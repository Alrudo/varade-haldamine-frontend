import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent implements OnInit {
  header: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ModalErrorComponent>,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data: string
  ) {
    const info = data.split(';');
    this.header = info[0];
    this.message = info[1];
  }

  ngOnInit(): void {}
}
