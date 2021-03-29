import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from './property.service';
import { Property } from './property';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Vara } from '@app/property/vara';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit, AfterViewInit {
  properties: Property[] = [];
  vara: Vara[] = [];
  datasource: MatTableDataSource<Property>;

  idFilter = new FormControl('');
  nameFilter = new FormControl('');
  last_checkFilter = new FormControl('');
  roomFilter = new FormControl('');
  statusFilter = new FormControl('');
  stateFilter = new FormControl('');

  columnsToDisplay = ['name', 'id', 'favouriteColour', 'pet'];
  filterValues = {
    id: '',
    name: '',
    last_check: '',
    room: '',
    status: '',
    state: '',
  };

  displayedColumns: string[] = ['checkboxes', 'id', 'name', 'last_check', 'room', 'status', 'state', 'actions'];

  constructor(private itemService: PropertyService) {}

  ngOnInit(): void {
    this.itemService.getProperties().subscribe((properties) => {
      this.properties = properties;
    });
    this.datasource = new MatTableDataSource(this.properties);
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
      this.filterValues.last_check = last_check.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.roomFilter.valueChanges.subscribe((room) => {
      this.filterValues.room = room.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.statusFilter.valueChanges.subscribe((status) => {
      this.filterValues.status = status.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
    this.stateFilter.valueChanges.subscribe((state) => {
      this.filterValues.state = state.toString().toLowerCase();
      this.datasource.filter = JSON.stringify(this.filterValues);
      console.log(JSON.stringify(this.filterValues));
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1 &&
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.last_check.toString().toLowerCase().indexOf(searchTerms.last_check) !== -1 &&
        data.room.toLowerCase().indexOf(searchTerms.room) !== -1 &&
        data.status.toLowerCase().indexOf(searchTerms.status) !== -1 &&
        data.state.toLowerCase().indexOf(searchTerms.state) !== -1
      );
    };
    return filterFunction;
  }

  getVara(): void {
    this.itemService.getVara().subscribe((vara) => (this.vara = vara));
  }
}
