import { Component, OnInit } from '@angular/core';
import { PropertyService } from '@app/property/property.service';
import { Classification } from '@app/classification';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private propertyService: PropertyService, public dialogRef: MatDialogRef<ModalComponent>) {}

  ngOnInit(): void {}

  add(mainclass: string, subclass: string) {
    const classification = {
      subClass: subclass,
      mainClass: mainclass,
    } as Classification;
    this.propertyService.addClassification(classification).subscribe();
    this.dialogRef.close();
  }
}
