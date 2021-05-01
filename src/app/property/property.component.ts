import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from '@app/asset';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  filterForm: FormGroup;
  filterChanges: Observable<any>;
  assets: Asset[] = [];
  currentPage: number;
  maxPage: number;
  totalElements: number;
  itemsPerPage: number;
  headElements: string[] = [
    '',
    'ID',
    'Nimi',
    'Maja ja Tuba',
    'PV klass ja alamklass',
    'Aktiivne',
    'Elujääk',
    'Kontrollitud',
    'Tegevused',
  ];

  constructor(private propertyService: PropertyService, private fb: FormBuilder) {
    this.initFilterForm();
  }

  ngOnInit() {
    this.fetchAssets();
    this.filterForm.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.filter();
    });
  }

  filter(): void {
    let params = new HttpParams();
    Object.keys(this.filterForm.controls).forEach((key) => {
      const value = this.filterForm.get(key);
      if (value !== null) {
        params = params.set(key, value.value.toString());
      }
    });
    this.propertyService.getFilteredAssets(params).subscribe((asset) => this.updateAssets(asset));
  }

  getPage(page: number) {
    page -= 1;
    this.propertyService.getPage(page).subscribe((data: any) => {
      this.updateAssets(data);
    });
  }

  fetchAssets(): void {
    this.propertyService.getAssets().subscribe((asset) => {
      this.updateAssets(asset);
    });
  }

  updateAssets(asset: JSON): void {
    this.assets = asset['content'];
    this.currentPage = asset['pageable']['pageNumber'] + 1;
    this.maxPage = asset['totalPages'];
    this.totalElements = asset['totalElements'];
    this.itemsPerPage = asset['size'];
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
}
