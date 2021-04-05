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
  asset: AssetInfo = {
    id: null,
    name: null,
    active: null,
    userId: null,
    possessorId: null,
    expirationDate: null,
    lifeMonthsLeft: null,
    delicateCondition: null,
    createdAt: null,
    modifiedAT: null,
    price: null,
    residualPrice: null,
    purchaseDate: null,
    isPurchased: null,
    subclass: null,
    mainClass: null,
    componentAssetId: null,
    majorAssetId: null,
    kitPartName: null,
    buildingAbbreviation: null,
    room: null,
    descriptionText: null,
    commentText: null,
    firstname: null,
    lastname: null,
    institute: null,
    division: null,
    subdivision: null,
  };

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private location: Location) {}

  ngOnInit(): void {
    this.getAsset();
  }

  goBack(): void {
    this.location.back();
  }

  getAsset(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getAssetById(id).subscribe((asset) => {
      this.asset = asset;
    });
  }
}
