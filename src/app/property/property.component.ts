import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Asset } from '@app/asset';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/auth';
import { HttpParams } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalErrorComponent } from '@app/modal-error/modal-error.component';

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
    { field: 'id', header: 'ID', disabled: true },
    { field: 'name', header: 'Name', disabled: true },
    { field: 'buildingAbbreviationPlusRoom', header: 'Building and room', disabled: false },
    { field: 'mainClassPlusSubclass', header: 'PV class and subclass', disabled: false },
    { field: 'active', header: 'Active', disabled: true },
    { field: 'lifeMonthsLeft', header: 'Life months left', disabled: false },
    { field: 'checked', header: 'Checked', disabled: true },
  ];
  sortableColumns = ['id', 'name', 'active', 'checked'];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    protected matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getRole();
    this.initFilterForm();
    this.getPage(1);
    this.filterForm.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.filter();
    });
  }

  filter(): void {
    this.loading = true;
    let params = new HttpParams();
    Object.keys(this.filterForm.controls).forEach((key) => {
      const value = this.filterForm.get(key);
      if (value !== null && value.value !== '') {
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
    if (this.sortableColumns.includes(event.sortField)) {
      this.loading = true;
      this.propertyService.getSortedAssets(event.sortField).subscribe((asset) => this.updateAssets(asset));
    }
  }

  updateAssets(asset: JSON): void {
    this.assets = asset.content;
    this.currentPage = asset.pageable.pageNumber + 1;
    this.totalPages = asset.totalPages;
    this.totalElements = asset.totalElements;
    this.itemsPerPage = asset.size;
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

  onCheckAll(): void {
    if (this.selected.length === this.assets.length) {
      this.selected = [];
    } else {
      this.selected = [];
      this.selected = this.selected.concat(this.assets);
    }
  }

  allChecked(): boolean {
    console.log(this.selected.length + ' / ' + this.assets.length);
    return this.selected.length === this.assets.length;
  }

  isChecked(asset: Asset): boolean {
    return this.selected.includes(asset);
  }

  checkAllOnPage(): void {
    this.propertyService.checkAllPageAssets(this.selected).subscribe(() => {
      this.getPage(1);
      this.selected = [];
    });
  }

  downloadInventoryExcel(): void {
    this.propertyService.getInventoryExcel().subscribe(
      (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error) => {
        this.openModal('Could not download Excel', 'Could not find inventory results.');
      }
    );
  }

  downloadInventoryExcelByYear(): void {
    this.propertyService.getInventoryExcel().subscribe(
      (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error) => {
        this.openModal('Could not download Excel', 'Could not find inventory results.');
      }
    );
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

  checkAsset(id: string): void {
    this.propertyService.checkAsset(id).subscribe(() => this.getPage(1));
  }

  startInventory(): void {
    this.propertyService.startInventory().subscribe(
      (res) => {
        this.getPage(1);
      },
      (error) => {
        this.openModal('Failed to start inventory', error['error']['message']);
      }
    );
  }

  endInventory(): void {
    this.propertyService.endInventory().subscribe(
      (res) => {
        this.getPage(1);
      },
      (error) => {
        this.openModal('Failed to end inventory', error['error']['message']);
      }
    );
  }

  openModal(header: string, error: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component-hz';
    dialogConfig.height = '250px';
    dialogConfig.width = '600px';
    dialogConfig.data = header + ';' + error;
    this.matDialog.open(ModalErrorComponent, dialogConfig);
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
