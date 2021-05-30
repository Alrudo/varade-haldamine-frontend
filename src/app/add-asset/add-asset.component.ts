import { Component, OnInit } from '@angular/core';
import { AssetInfo } from '@app/assetInfo';
import { PropertyService } from '@app/property/property.service';
import { ModalComponent } from '@app/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from '@app/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  isSubmitSuccessful = false;
  isSubmitFail = false;

  form: FormGroup;

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

  constructor(
    private propertyService: PropertyService,
    protected matDialog: MatDialog,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (window.localStorage.getItem('role') == null) {
      window.location.href = 'http://localhost:4200/home';
    }
    this.getRole();
    this.getClassification();
    this.getPossessor();
    this.getMajorAssets();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      price: new FormControl(null, [Validators.required]),
      residualPrice: new FormControl(null, [Validators.min(1)]),
      building: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      room: new FormControl('', [Validators.maxLength(10)]),
      description: new FormControl('', [Validators.maxLength(255)]),
      possessorId: new FormControl('', [Validators.required]),
      purchaseDate: new FormControl('', []),
      lifeMonthsLeft: new FormControl('', [Validators.required, Validators.min(1)]),
      isDelicate: new FormControl(false, [Validators.required]),
      mainClass: new FormControl(null, [Validators.required]),
      subClass: new FormControl(null, [Validators.required]),
    });
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
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
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
        checked: true,
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
      this.propertyService.sendAsset(asset).subscribe(
        () => {
          this.isSubmitSuccessful = true;
          this.isSubmitFail = false;
        },
        (error) => {
          this.isSubmitSuccessful = false;
          // this.isSubmitFail = true;
          console.log(error);
        }
      );
    }
  }

  getRole() {
    this.authenticationService.getUserRole().subscribe((role) => {
      if (role !== 'Raamatupidaja') {
        // @ts-ignore
        this.router.navigate(['/home']);
      }
    });
  }

  getRoleSessionStorage(): string {
    return window.localStorage.getItem('role');
  }

  get getId() {
    return this.form.get('id');
  }
  get getName() {
    return this.form.get('name');
  }
  get getPrice() {
    return this.form.get('price');
  }
  get getResidualPrice() {
    return this.form.get('residualPrice');
  }
  get getBuilding() {
    return this.form.get('building');
  }
  get getRoom() {
    return this.form.get('room');
  }
  get getDescription() {
    return this.form.get('description');
  }
  get getPossessorId() {
    return this.form.get('possessorId');
  }
  get getPurchaseDate() {
    return this.form.get('purchaseDate');
  }
  get getLifeMonthsLeft() {
    return this.form.get('lifeMonthsLeft');
  }
  get getIsDelicate() {
    return this.form.get('isDelicate');
  }
  get getMainClass() {
    return this.form.get('mainClass');
  }
  get getSubClass() {
    return this.form.get('subClass');
  }
}
