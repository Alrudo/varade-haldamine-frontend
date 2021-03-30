import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from '@app/property/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
