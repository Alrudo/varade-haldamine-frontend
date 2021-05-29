import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from '@app/property/property.service';
import { AssetInfo } from '@app/assetInfo';

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

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) {}

  ngOnInit(): void {
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

  changeSessionStorage(link: string) {
    sessionStorage.setItem('currentPage', link);
  }

  changeSessionStoregeId(link: string, id: string) {
    sessionStorage.setItem('currentPage', link);
    sessionStorage.setItem('id', id);
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
    this.propertyService.getUserRole().subscribe((r) => {
      this.userRole = r;
    });
  }
}
