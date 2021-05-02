import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from '@app/asset';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { LazyLoadEvent, SortEvent } from 'primeng/api';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  filterForm: FormGroup;
  assets: Asset[] = [];
  selected: Asset[] = [];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  itemsPerPage: number;
  loading: boolean;
  headElements = [
    { field: ' ', header: 'Vali kõik' },
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nimi' },
    { field: 'buildingAbbreviationPlusRoom', header: 'Maja ja tuba' },
    { field: 'mainClassPlusSubclass', header: 'PV klass ja alamklass' },
    { field: 'active', header: 'Aktiivne' },
    { field: 'lifeMonthsLeft', header: 'Elujääk' },
    { field: 'checked', header: 'Kontrollitud' },
    { field: 'actions', header: 'Tegevused' },
  ];

  constructor(private propertyService: PropertyService, private fb: FormBuilder) {
    this.initFilterForm();
  }

  ngOnInit() {
    this.getPage(1);
    this.filterForm.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.filter();
    });
    this.loading = true;
  }

  filter(): void {
    this.loading = true;
    let params = new HttpParams();
    Object.keys(this.filterForm.controls).forEach((key) => {
      const value = this.filterForm.get(key);
      if (value !== null) {
        params = params.set(key, value.value.toString());
      }
    });
    this.propertyService.getFilteredAssets(params).subscribe((asset) => this.updateAssets(asset));
  }

  getPage(page: number): void {
    this.loading = true;
    page -= 1;
    this.propertyService.getPage(page).subscribe((data: any) => {
      this.updateAssets(data);
    });
  }

  sortAssets(event: LazyLoadEvent): void {
    this.loading = true;
    this.propertyService.getSortedAssets(event.sortField).subscribe((asset) => this.updateAssets(asset));
  }

  updateAssets(asset: JSON): void {
    this.assets = asset['content'];
    this.currentPage = asset['pageable']['pageNumber'] + 1;
    this.totalPages = asset['totalPages'];
    this.totalElements = asset['totalElements'];
    this.itemsPerPage = asset['size'];
    this.loading = false;
  }

  onCheck(asset: Asset): void {
    if (!this.selected.includes(asset)) {
      this.selected.push(asset);
    } else {
      const index = this.selected.indexOf(asset, 0);
      this.selected.splice(index, 1);
    }
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
