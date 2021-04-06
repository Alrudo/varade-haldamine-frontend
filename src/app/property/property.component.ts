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
  currentPage: number;
  maxPage: number;
  forwardNumber: number;
  backwardNumber: number;
  headElements: string[] = [
    '',
    'ID',
    'Nimi',
    'Maja ja Tuba',
    'PV klass ja alamklass',
    'Active',
    'Elujaak',
    'Kontrollitud',
    'Tegevused',
  ];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.getFirstAsset();
  }

  getFirstAsset(): void {
    this.propertyService.getAssets().subscribe((asset) => {
      this.updateAssets(asset);
    });
  }

  updateAssets(asset: JSON): void {
    this.assets = asset['content'];
    this.currentPage = asset['pageable']['pageNumber'];
    this.maxPage = asset['totalPages'];
    if (this.currentPage === this.maxPage) {
      this.forwardNumber = this.maxPage;
    } else {
      this.forwardNumber = this.currentPage + 1;
    }
    if (this.currentPage === 0) {
      this.backwardNumber = 0;
    } else {
      this.backwardNumber = this.currentPage - 1;
    }
  }

  backward(): void {
    this.propertyService.backward(this.backwardNumber).subscribe((asset) => {
      this.updateAssets(asset);
    });
  }

  forward(): void {
    this.propertyService.forward(this.forwardNumber).subscribe((asset) => {
      this.updateAssets(asset);
    });
  }

  fullForward(): void {
    this.propertyService.fullForward(this.maxPage).subscribe((asset) => {
      this.updateAssets(asset);
    });
  }
}
