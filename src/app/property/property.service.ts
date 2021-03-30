import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Asset } from '@app/asset';
import { AssetInfo } from '@app/assetInfo';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private url = 'asset';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.url);
  }

  getAssetById(id: string): Observable<AssetInfo> {
    const url = `${this.url}/${id}`;
    return this.http.get<AssetInfo>(url);
  }
}
