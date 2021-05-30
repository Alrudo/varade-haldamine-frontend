import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '@app/property/property.service';
import { AssetInfo } from '@app/assetInfo';
import { AuthenticationService } from '@app/auth';
import { Location } from '@angular/common';

interface MainClassification {
  value: string;
  viewValue: string;
}

interface SubClassification {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-change-asset-form',
  templateUrl: './change-asset-form.component.html',
  styleUrls: ['./change-asset-form.component.scss'],
})
export class ChangeAssetFormComponent implements OnInit {
  asset: AssetInfo;

  isChecked: any = false;
  isChecked2: any = false;
  isChecked3: any = false;

  selectClassification: string;

  mainClassifications: MainClassification[] = [];

  selectSubClassification: string;

  subClassifications: SubClassification[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('role') == null) {
      window.location.href = 'http://localhost:4200/home';
    }
    this.getRole();
    this.getAsset();
    this.getClassification();
  }

  getAsset(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getAssetById(id).subscribe((asset) => {
      this.asset = asset;
    });
  }

  getClassification(): void {
    this.propertyService.getClassification().subscribe((classification) => {
      classification.forEach((item, i) => {
        this.mainClassifications.push({ value: item['mainClass'], viewValue: item['mainClass'] } as MainClassification);
        this.subClassifications.push({ value: item['subClass'], viewValue: item['subClass'] } as SubClassification);
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  change(
    name: string,
    id: string,
    priceValue: string,
    residualPriceValue: string,
    descriptionText: string,
    selectClassification: string,
    selectSubClassification: string,
    isChecked: boolean,
    buildingAbbreviation: string,
    roomValue: string,
    userId: string,
    personNameValue: string,
    personSecondNameValue: string,
    isChecked2: boolean,
    structuralUnit: string,
    subdivisionValue: string,
    lifeMonthsLeft: string,
    isChecked3: boolean
  ): void {
    if (isChecked == true && this.asset.active == true) {
      isChecked = false;
    } else if (isChecked == false && this.asset.active == true) {
      isChecked = true;
    }
    if (isChecked2 == true && this.asset.isPurchased == true) {
      isChecked2 = false;
    }

    if (isChecked3 == true && this.asset.delicateCondition == true) {
      isChecked3 = false;
    } else if (isChecked3 == false && this.asset.delicateCondition == true) {
      isChecked3 = true;
    }
    const obj = ({
      active: isChecked,
      buildingAbbreviation: buildingAbbreviation,
      delicateCondition: isChecked3,
      descriptionText: descriptionText,
      firstname: personNameValue,
      id: id,
      isPurchased: isChecked2,
      lastname: personSecondNameValue,
      lifeMonthsLeft: lifeMonthsLeft,
      mainClass: selectClassification,
      name: name,
      price: priceValue,
      residualPrice: residualPriceValue,
      room: roomValue,
      structuralUnit: structuralUnit,
      subclass: selectSubClassification,
      subdivision: subdivisionValue,
      userId: userId,
    } as unknown) as JSON;
    console.log(obj);
    this.propertyService.changeAsset(obj, this.asset.id).subscribe(() => {
      this.getAsset();
    });
  }

  getRole() {
    this.authenticationService.getUserRole().subscribe((role) => {
      window.localStorage.setItem('role', role);
      if (role !== 'Raamatupidaja') {
        this.router.navigate(['/home']);
      }
    });
  }

  getRoleSessionStorage(): string {
    return window.localStorage.getItem('role');
  }
}
