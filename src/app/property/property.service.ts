import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '@app/asset';
import { AssetInfo } from '@app/assetInfo';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private url = 'asset';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<JSON> {
    const url = `asset/filtered?order=ASC&page=0&sortBy=id`;
    return this.http.get<JSON>(url);
  }

  getAssetById(id: string): Observable<AssetInfo> {
    const url = `${this.url}/${id}`;
    return this.http.get<AssetInfo>(url);
  }

  sendAsset(asset: AssetInfo): Observable<AssetInfo> {
    return this.http.post<AssetInfo>(this.url, asset, this.httpOptions);
  }

  fullBack(): Observable<Asset[]> {
    return;
  }
}
