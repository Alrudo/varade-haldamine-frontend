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

interface Location {
  value: string;
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

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
})
export class AddAssetComponent implements OnInit {
  selectClassification: string;
  mainClassifications: MainClassification[] = [
    { value: 'VV', viewValue: 'VV' },
    { value: 'PV', viewValue: 'PV' },
    { value: 'BV', viewValue: 'BV' },
  ];

  selectSubClassification: string;

  subClassifications: SubClassification[] = [
    { value: 'VV_ARVUTI', viewValue: 'VV_ARVUTI' },
    { value: 'VV_TELEFFON', viewValue: 'VV_TELEFFON' },
    { value: 'VV_MÖÖBEL', viewValue: 'VV_MÖÖBEL' },
    { value: 'PV_SEADMED', viewValue: 'PV_SEADMED' },
    { value: 'BV_TÖÖRIIST', viewValue: 'BV_TÖÖRIIST' },
    { value: 'BV_ARVUTI', viewValue: 'BV_ARVUTI' },
    { value: 'BV_MONITOR', viewValue: 'BV_MONITOR' },
  ];

  selectForComplect = 'none';
  pickerFilter: Date;
  complects: Complect[] = [
    { value: 'majorAssetId', viewValue: 'Major asset' },
    { value: 'componentAssetId', viewValue: 'Component Asset' },
    { value: 'none', viewValue: 'None' },
  ];

  modeselect = false;

  delicates: Delicate[] = [
    { value: false, viewValue: 'No' },
    { value: true, viewValue: 'Yes' },
  ];

  selectLocation: string;

  locations: Location[] = [
    { value: 'institute', viewValue: 'Institute' },
    { value: 'division', viewValue: 'Division' },
  ];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {}
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  adding(
    id: string,
    name: string,
    possessorId: string,
    lifeMonthsLeft: number,
    delicateCondition: boolean,
    price: string,
    subclass: string,
    mainClass: string,
    residualPrice: string,
    selectForComplect: string,
    complect: string,
    buildingAbbreviation: string,
    room: string,
    descriptionText: string,
    selectLocation: string,
    location: string,
    subdivision: string
  ): void {
    if (selectForComplect === 'componentAssetId') {
      const asset: AssetInfo = {
        id,
        name,
        active: true,
        userId: null,
        possessorId: Number(possessorId),
        lifeMonthsLeft,
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
        componentAssetId: id,
        majorAssetId: complect,
        kitPartName: null,
        buildingAbbreviation,
        room,
        descriptionText,
        commentText: null,
        firstname: null,
        lastname: null,
        structuralUnit: Number(location),
        subdivision: Number(subdivision),
      };
      this.propertyService.sendAsset(asset as AssetInfo).subscribe();
    } else if (selectForComplect === 'majorAssetId') {
      const asset: AssetInfo = {
        id,
        name,
        active: true,
        userId: null,
        possessorId: Number(possessorId),
        lifeMonthsLeft,
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
        componentAssetId: id,
        majorAssetId: id,
        kitPartName: null,
        buildingAbbreviation,
        room,
        descriptionText,
        commentText: null,
        firstname: null,
        lastname: null,
        structuralUnit: Number(location),
        subdivision: Number(subdivision),
      };
      this.propertyService.sendAsset(asset as AssetInfo).subscribe();
    } else {
      const asset: AssetInfo = {
        id,
        name,
        active: true,
        userId: null,
        possessorId: Number(possessorId),
        lifeMonthsLeft,
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
        lastname: null,
        structuralUnit: Number(location),
        subdivision: Number(subdivision),
      };
      this.propertyService.sendAsset(asset as AssetInfo).subscribe();
    }
  }
}
