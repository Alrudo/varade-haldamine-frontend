import { Component, OnInit } from '@angular/core';
import { AssetInfo } from '@app/assetInfo';
import { PropertyService } from '@app/property/property.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '@app/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from '@app/auth';
import { Router } from '@angular/router';

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
  user: any;

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

  constructor(
    private propertyService: PropertyService,
    protected matDialog: MatDialog,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getRole();
    this.getClassification();
    this.getPossessor();
    this.getMajorAssets();
  }

  getClassification(): void {
    this.propertyService.getClassification().subscribe((classification) => {
      classification.forEach((item, i) => {
        const mainClass = { value: item['mainClass'], viewValue: item['mainClass'] } as MainClassification;
        const subClass = { value: item['subClass'], viewValue: item['subClass'] } as SubClassification;
        if (this.mainClassifications.find((item1) => item1.value === item['mainClass']) == null) {
          this.mainClassifications.push(mainClass);
        }
        if (this.subClassifications.find((item1) => item1.value === item['subClass']) == null) {
          this.subClassifications.push(subClass);
        }
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
      });
    });
  }

  open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(() => {
      this.getClassification();
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

  getUser() {
    this.authenticationService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  getRole() {
    this.authenticationService.getUserRole().subscribe((role) => {
      if (role !== 'Raamatupidaja') {
        console.log(role);
        // @ts-ignore
        this.router.navigate(['/home']);
      }
    });
  }
}
