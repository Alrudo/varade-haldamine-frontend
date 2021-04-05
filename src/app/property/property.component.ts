import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { Asset } from '@app/asset';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  assets: Asset[] = [];
  previous: any = [];
  currentPage: number;
  headElements: string[] = [
    'checkboxes',
    'id',
    'name',
    'modifiedAt',
    'buildingAbbreviationPlusRoom',
    'active',
    'personName',
    'actions',
  ];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.getAssets().subscribe((asset) => {
      this.assets = asset['content'];
      this.currentPage = asset['pageable']['pageNumber'];
      console.log(this.currentPage);
    });
  }
}
