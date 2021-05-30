import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from '@app/property/property.service';
import { AssetInfo } from '@app/assetInfo';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  asset: AssetInfo;
  currentPage: number;
  maxPage: number;
  userRole: string;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private authenticationService: AuthenticationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('role') == null) {
      window.location.href = 'http://localhost:4200/home';
    }
    this.getAsset();
    this.getRole();
  }

  getAsset(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getAssetById(id).subscribe((asset) => {
      this.asset = asset;
      this.getAssetAuditInfo();
    });
  }

  goBack(): void {
    this.location.back();
  }

  getAssetAuditInfo(): void {
    this.propertyService.getAssetAuditInfo(this.asset).subscribe((r) => {
      this.maxPage = r['totalElements'];
      this.currentPage = 0;
    });
  }

  backward(): void {
    if (this.currentPage - 1 >= 0) {
      this.currentPage -= 1;
      this.propertyService.getAssetAuditBackwards(this.asset, this.currentPage).subscribe((r) => {
        this.asset = r;
      });
    }
  }

  forward(): void {
    if (this.currentPage + 1 <= this.maxPage - 1) {
      this.currentPage += 1;
      this.propertyService.getAssetAuditForward(this.asset, this.currentPage).subscribe((r) => {
        this.asset = r;
      });
    }
  }

  fullForward(): void {
    this.currentPage = this.maxPage - 1;
    this.propertyService.getAssetAuditFullForward(this.asset, this.maxPage).subscribe((r) => {
      this.asset = r;
    });
  }

  fullBackward(): void {
    this.currentPage = 0;
    this.propertyService.getAssetAuditFullBackwards(this.asset, 0).subscribe((r) => {
      this.asset = r;
    });
  }

  getRole() {
    this.propertyService.getUserRole().subscribe((role) => {
      window.localStorage.setItem('role', role);
      this.userRole = role;
    });
  }

  getRoleSessionStorage(): string {
    return window.localStorage.getItem('role');
  }
}
