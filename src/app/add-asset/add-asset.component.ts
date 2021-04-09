import { Component, OnInit } from '@angular/core';
import { AssetInfo } from '@app/assetInfo';
import { PropertyService } from '@app/property/property.service';

interface Complect {
  value: string;
  viewValue: string;
}

interface Delicate {
  value: boolean;
  viewValue: string;
}

interface MainClassification {
  value: string;
  viewValue: string;
}

interface SubClassification {
  value: string;
  viewValue: string;
}

interface PossessorId {
  value: string;
  viewValue: string;
}

interface MajorAsset {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
})
export class AddAssetComponent implements OnInit {
  selectClassification: string;

  mainClassifications: MainClassification[] = [];

  selectSubClassification: string;

  subClassifications: SubClassification[] = [];

  possessors: PossessorId[] = [];

  majorAssets: MajorAsset[] = [];

  selectForComplect = 'none';

  possessorSellect: string;

  complects: Complect[] = [
    { value: 'majorAssetId', viewValue: 'Major asset' },
    { value: 'componentAssetId', viewValue: 'Component Asset' },
    { value: 'none', viewValue: 'None' },
  ];

  modeselect = false;

  sellectAsset: string;

  delicates: Delicate[] = [
    { value: false, viewValue: 'No' },
    { value: true, viewValue: 'Yes' },
  ];

  selectLocation: string;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getClassification();
    this.getPossessor();
    this.getMajorAssets();
  }

  getClassification(): void {
    this.propertyService.getClassification().subscribe((classification) => {
      classification.forEach((item, i) => {
        this.mainClassifications.push({ value: item['mainClass'], viewValue: item['mainClass'] } as MainClassification);
        this.subClassifications.push({ value: item['subClass'], viewValue: item['subClass'] } as SubClassification);
      });
    });
  }

  getPossessor(): void {
    this.propertyService.getPossessor().subscribe((possessor) => {
      possessor.forEach((item, i) => {
        // tslint:disable-next-line:max-line-length
        this.possessors.push({
          value: item['id'],
          viewValue: item['structuralUnit'] + ' ' + item['subdivision'],
        } as PossessorId);
      });
    });
  }

  getMajorAssets(): void {
    this.propertyService.getMajorAssets().subscribe((majorAssets) => {
      majorAssets.forEach((item, i) => {
        // tslint:disable-next-line:max-line-length
        this.majorAssets.push({ value: item, viewValue: item } as PossessorId);
        console.log();
      });
    });
  }

  adding(
    id: string,
    name: string,
    possessorId: string,
    lifeMonthsLeft: string,
    delicateCondition: boolean,
    price: string,
    subclass: string,
    mainClass: string,
    residualPrice: string,
    selectForComplect: string,
    complect: string,
    buildingAbbreviation: string,
    room: string,
    descriptionText: string
  ): void {
    if (selectForComplect === 'componentAssetId') {
      const asset = {
        id,
        name,
        active: true,
        userId: null,
        possessorId: Number(possessorId),
        lifeMonthsLeft: Number(lifeMonthsLeft),
        delicateCondition,
        checked: null,
        createdAt: null,
        modifiedAT: null,
        price: Number(price),
        residualPrice: Number(residualPrice),
        purchaseDate: null,
        isPurchased: null,
        subclass,
        mainClass,
        componentAssetId: null,
        majorAssetId: complect,
        kitPartName: null,
        buildingAbbreviation,
        room,
        descriptionText,
        commentText: null,
        firstname: null,
        structuralUnit: null,
        subdivision: null,
      } as AssetInfo;
      this.propertyService.sendAsset(asset).subscribe();
    } else if (selectForComplect === 'majorAssetId') {
      const asset = {
        id,
        name,
        active: true,
        userId: null,
        possessorId: Number(possessorId),
        lifeMonthsLeft: Number(lifeMonthsLeft),
        delicateCondition,
        checked: null,
        createdAt: null,
        modifiedAT: null,
        price: Number(price),
        residualPrice: Number(residualPrice),
        purchaseDate: null,
        isPurchased: null,
        subclass,
        mainClass,
        componentAssetId: null,
        majorAssetId: id,
        kitPartName: null,
        buildingAbbreviation,
        room,
        descriptionText,
        commentText: null,
        firstname: null,
        structuralUnit: null,
        subdivision: null,
      } as AssetInfo;
      this.propertyService.sendAsset(asset).subscribe();
    } else {
      const asset = {
        id,
        name,
        active: true,
        userId: null,
        possessorId: Number(possessorId),
        lifeMonthsLeft: Number(lifeMonthsLeft),
        delicateCondition,
        checked: null,
        createdAt: null,
        modifiedAT: null,
        price: Number(price),
        residualPrice: Number(residualPrice),
        purchaseDate: null,
        isPurchased: null,
        subclass,
        mainClass,
        componentAssetId: null,
        majorAssetId: null,
        kitPartName: null,
        buildingAbbreviation,
        room,
        descriptionText,
        commentText: null,
        firstname: null,
        structuralUnit: null,
        subdivision: null,
      } as AssetInfo;
      this.propertyService.sendAsset(asset).subscribe();
    }
  }
}
