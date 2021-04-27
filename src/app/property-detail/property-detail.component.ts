import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from '@app/property/property.service';
import { AssetInfo } from '@app/assetInfo';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  asset: AssetInfo;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private location: Location) {}

  ngOnInit(): void {
    this.getAsset();
  }

  getAsset(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getAssetById(id).subscribe((asset) => {
      this.asset = asset;
      console.log(asset);
    });
  }

  changeSessionStorage(link: string) {
    sessionStorage.setItem('currentPage', link);
  }
}
