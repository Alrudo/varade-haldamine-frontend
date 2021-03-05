import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from './property.service';
import { Property } from './property';
import { BehaviorSubject } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit, AfterViewInit {
  properties: Property[] = [];
  datasource: MatTableDataSource<Property>;

  displayedColumns: string[] = ['checkboxes', 'id', 'name', 'last_check', 'room', 'status', 'state', 'actions'];

  constructor(private itemService: PropertyService) {}

  ngOnInit(): void {
    this.itemService.getProperties().subscribe((properties) => {
      this.properties = properties;
      this.datasource = new MatTableDataSource(properties);
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }

  // filterKeyValues = this.tableHeader.map(({ key } => ({key, value: ""}));

  // filterSubject$ = new BehaviorSubject(this.filterKeyValues);

  // filter$ = this.filterSubject$.asObservable();

  // public inputChange(event: any, key) {
  //   this.filterKeyValues.find(({key: testKey}) => testKey == key).value =
  //   event.target.value;
  //   this.filterSubject$.next(this.filterKeyValues);
}
