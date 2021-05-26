import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from '@app/asset';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/auth';
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
  userRole: any;
  filterForm: FormGroup;
  assets: Asset[] = [];
  selected: Asset[] = [];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  itemsPerPage: number;
  loading: boolean;
  headElements = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nimi' },
    { field: 'buildingAbbreviationPlusRoom', header: 'Maja ja tuba' },
    { field: 'mainClassPlusSubclass', header: 'PV klass ja alamklass' },
    { field: 'active', header: 'Aktiivne' },
    { field: 'lifeMonthsLeft', header: 'Elujääk' },
    { field: 'checked', header: 'Kontrollitud' },
  ];

  constructor(private propertyService: PropertyService, private fb: FormBuilder) {
    this.initFilterForm();
  }
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

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
    this.getRole();
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

  changeSessionStorage(id: string, link: string) {
    sessionStorage.setItem('currentPage', link);
    sessionStorage.setItem('id', id);
  }

  excel(): void {
    this.propertyService.getExcel().subscribe((response) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  getRole(): void {
    this.authenticationService.getUserRole().subscribe((role) => {
      this.userRole = role;
    });
  }
}
