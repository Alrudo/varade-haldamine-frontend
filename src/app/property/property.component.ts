import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from '@app/asset';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  filterForm: FormGroup;
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

  constructor(private propertyService: PropertyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initFilterForm();
    this.getFirstAsset();
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      buildingAbbreviationPlusRoom: new FormControl(''),
      mainClassPlusSubclass: new FormControl(''),
      active: new FormControl(''),
      lifeMonthsLeft: new FormControl(''),
      checked: new FormControl(''),
    });
  }

  filter(): void {
    this.propertyService
      .getFilteredAssets(
        this.filterForm.get('id').value,
        this.filterForm.get('name').value,
        this.filterForm.get('active').value,
        this.filterForm.get('buildingAbbreviationPlusRoom').value,
        this.filterForm.get('lifeMonthsLeft').value,
        this.filterForm.get('mainClassPlusSubclass').value
      )
      .subscribe((asset) => {
        this.updateAssets(asset);
      });
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
    this.propertyService
      .backward(
        this.backwardNumber,
        this.filterForm.get('id').value,
        this.filterForm.get('name').value,
        this.filterForm.get('active').value,
        this.filterForm.get('buildingAbbreviationPlusRoom').value,
        this.filterForm.get('lifeMonthsLeft').value,
        this.filterForm.get('mainClassPlusSubclass').value
      )
      .subscribe((asset) => {
        this.updateAssets(asset);
      });
  }

  forward(): void {
    this.propertyService
      .forward(
        this.forwardNumber,
        this.filterForm.get('id').value,
        this.filterForm.get('name').value,
        this.filterForm.get('active').value,
        this.filterForm.get('buildingAbbreviationPlusRoom').value,
        this.filterForm.get('lifeMonthsLeft').value,
        this.filterForm.get('mainClassPlusSubclass').value
      )
      .subscribe((asset) => {
        this.updateAssets(asset);
      });
  }

  fullForward(): void {
    this.propertyService
      .fullForward(
        this.maxPage,
        this.filterForm.get('id').value,
        this.filterForm.get('name').value,
        this.filterForm.get('active').value,
        this.filterForm.get('buildingAbbreviationPlusRoom').value,
        this.filterForm.get('lifeMonthsLeft').value,
        this.filterForm.get('mainClassPlusSubclass').value
      )
      .subscribe((asset) => {
        this.updateAssets(asset);
      });
  }

  fullBackward(): void {
    this.propertyService
      .fullBackward(
        0,
        this.filterForm.get('id').value,
        this.filterForm.get('name').value,
        this.filterForm.get('active').value,
        this.filterForm.get('buildingAbbreviationPlusRoom').value,
        this.filterForm.get('lifeMonthsLeft').value,
        this.filterForm.get('mainClassPlusSubclass').value
      )
      .subscribe((asset) => {
        this.updateAssets(asset);
      });
  }
}
