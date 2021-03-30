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
    modifiedAt: '',
    buildingAbbreviationPlusRoom: '',
    active: '',
    personName: '',
  };

  displayedColumns: string[] = [
    'checkboxes',
    'id',
    'name',
    'modifiedAt',
    'buildingAbbreviationPlusRoom',
    'active',
    'personName',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemService: PropertyService) {}

  ngOnInit(): void {
    this.itemService.getAssets().subscribe((asset) => {
      this.assets = asset;
      this.datasource = new MatTableDataSource(this.assets);
      this.datasource.filterPredicate = this.createFilter();
      console.log(this.assets);
      this.datasource.sort = this.sort;
    });

    this.idFilter.valueChanges.subscribe((id) => {
      this.filterValues.id = id.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.nameFilter.valueChanges.subscribe((name) => {
      this.filterValues.name = name.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.last_checkFilter.valueChanges.subscribe((last_check) => {
      this.filterValues.modifiedAt = last_check.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.addressFilter.valueChanges.subscribe((room) => {
      this.filterValues.buildingAbbreviationPlusRoom = room.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.statusFilter.valueChanges.subscribe((status) => {
      this.filterValues.active = status.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.userFilter.valueChanges.subscribe((user) => {
      this.filterValues.personName = user.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
      console.log(JSON.stringify(this.filterValues));
    });
  }

  ngAfterViewInit() {}

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data: any, filter: any): boolean {
      const searchTerms = JSON.parse(filter);
      return (
        data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1 &&
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.modifiedAt.toString().toLowerCase().indexOf(searchTerms.modifiedAt) !== -1 &&
        data.buildingAbbreviationPlusRoom.toLowerCase().indexOf(searchTerms.buildingAbbreviationPlusRoom) !== -1 &&
        data.active.toLowerCase().indexOf(searchTerms.active) !== -1 &&
        data.personName.toLowerCase().indexOf(searchTerms.personName) !== -1
      );
    };
    return filterFunction;
  }
}
