import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from './property.service';
import { Asset } from '@app/asset';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit, AfterViewInit {
  assets: Asset[];
  datasource: MatTableDataSource<Asset>;

  idFilter = new FormControl('');
  nameFilter = new FormControl('');
  last_checkFilter = new FormControl('');
  addressFilter = new FormControl('');
  statusFilter = new FormControl('');
  userFilter = new FormControl('');

  columnsToDisplay = ['name', 'id', 'favouriteColour', 'pet'];
  filterValues = {
    id: '',
    name: '',
    modified_at: '',
    address: '',
    active: '',
    user: '',
  };

  displayedColumns: string[] = ['checkboxes', 'id', 'name', 'modified_at', 'address', 'active', 'user', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemService: PropertyService) {}

  ngOnInit(): void {
    this.itemService.getAssets().subscribe((asset) => (this.assets = asset));
    this.datasource = new MatTableDataSource(this.assets);
    this.datasource.filterPredicate = this.createFilter();
    this.idFilter.valueChanges.subscribe((id) => {
      this.filterValues.id = id.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.nameFilter.valueChanges.subscribe((name) => {
      this.filterValues.name = name.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.last_checkFilter.valueChanges.subscribe((last_check) => {
      this.filterValues.modified_at = last_check.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.addressFilter.valueChanges.subscribe((room) => {
      this.filterValues.address = room.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.statusFilter.valueChanges.subscribe((status) => {
      this.filterValues.active = status.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.userFilter.valueChanges.subscribe((user) => {
      this.filterValues.user = user.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
      console.log(JSON.stringify(this.filterValues));
    });
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data: any, filter: any): boolean {
      const searchTerms = JSON.parse(filter);
      return (
        data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1 &&
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.modified_at.toString().toLowerCase().indexOf(searchTerms.last_check) !== -1 &&
        data.room.toLowerCase().indexOf(searchTerms.room) !== -1 &&
        data.status.toLowerCase().indexOf(searchTerms.status) !== -1 &&
        data.state.toLowerCase().indexOf(searchTerms.state) !== -1
      );
    };
    return filterFunction;
  }
}
