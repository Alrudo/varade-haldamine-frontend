import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AssetInfo } from '@app/assetInfo';
import { Classification } from '@app/classification';
import { Asset } from '@app/asset';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private url = 'api/asset';
  private baseUrl = 'api/asset';
  private filterUrl = `${this.baseUrl}/filtered?`;
  private auditUrl = `${this.baseUrl}/audit`;
  private filterParams = new HttpParams();
  private pageParams = new HttpParams().set('page', 0 + '');
  private sortParams = new HttpParams().set('sortBy', 'id').set('order', 'ASC');

  constructor(private http: HttpClient) {}

  fetchAssets(): Observable<JSON> {
    const params = this.mergeParams(this.pageParams, this.filterParams, this.sortParams);
    return this.http.get<JSON>(this.filterUrl, { params });
  }

  getFilteredAssets(filterParams: HttpParams): Observable<JSON> {
    this.filterParams = filterParams;
    this.resetPage();
    return this.fetchAssets();
  }

  getPage(page: number): Observable<JSON> {
    this.pageParams = new HttpParams().set('page', page.toString());
    return this.fetchAssets();
  }

  getSortedAssets(field: string): Observable<JSON> {
    if (this.sortParams.get('order') !== null) {
      if (this.sortParams.get('order') === 'ASC') {
        this.sortParams = new HttpParams().set('sortBy', field).set('order', 'DSC');
      } else {
        this.sortParams = new HttpParams().set('sortBy', field).set('order', 'ASC');
      }
    }
    return this.fetchAssets();
  }

  mergeParams(params1: HttpParams, params2: HttpParams, params3: HttpParams): HttpParams {
    let mergedParams = new HttpParams();
    params1.keys().forEach((key) => {
      mergedParams = mergedParams.append(key, params1.get(key));
    });
    params2.keys().forEach((key) => {
      mergedParams = mergedParams.append(key, params2.get(key));
    });
    params3.keys().forEach((key) => {
      mergedParams = mergedParams.append(key, params3.get(key));
    });
    return mergedParams;
  }

  resetPage() {
    this.pageParams = new HttpParams().set('page', 0 + '');
  }

  getAssetById(id: string): Observable<AssetInfo> {
    const url = `${this.url}/${id}`;
    return this.http.get<AssetInfo>(url);
  }

  sendAsset(asset: AssetInfo): Observable<AssetInfo> {
    return this.http.post<AssetInfo>(this.url, asset, this.httpOptions);
  }

  getClassification(): Observable<Classification[]> {
    const url = `api/class`;
    return this.http.get<Classification[]>(url);
  }

  getPossessor(): Observable<[]> {
    const url = `api/possessor`;
    return this.http.get<[]>(url);
  }

  getMajorAssets(): Observable<[]> {
    const url = `api/kit/majorAssets`;
    return this.http.get<[]>(url);
  }

  getAssetAuditInfo(asset: AssetInfo): Observable<JSON> {
    const url = `${this.auditUrl}/${asset.id}`;
    return this.http.get<JSON>(url);
  }

  getAssetAuditForward(asset: AssetInfo, nextAsset: number): Observable<AssetInfo> {
    return this.http.get<AssetInfo>(`${this.baseUrl}/audit?assetId=${asset.id}&index=${nextAsset}`);
  }

  getAssetAuditBackwards(asset: AssetInfo, previousAsset: number): Observable<AssetInfo> {
    return this.http.get<AssetInfo>(`${this.baseUrl}/audit?assetId=${asset.id}&index=${previousAsset}`);
  }

  getAssetAuditFullForward(asset: AssetInfo, maxNumber: number): Observable<AssetInfo> {
    return this.http.get<AssetInfo>(`${this.baseUrl}/audit?assetId=${asset.id}&index=${maxNumber - 1}`);
  }
  getAssetAuditFullBackwards(asset: AssetInfo, zero: number): Observable<AssetInfo> {
    return this.http.get<AssetInfo>(`${this.baseUrl}/audit?assetId=${asset.id}&index=${zero}`);
  }

  changeAsset(asset: JSON, id: string): Observable<JSON> {
    return this.http.put<JSON>(`${this.baseUrl}/${id}`, asset, this.httpOptions);
  }

  getUserRole(): Observable<string> {
    // @ts-ignore
    return this.http.get<string>(`${this.baseUrl}/accountt`, { responseType: 'text' });
  }

  addClassification(classification: Classification): Observable<Classification> {
    return this.http.post<Classification>(`api/class`, classification, this.httpOptions);
  }

  getInventoryExcel(): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`${this.baseUrl}/inventoryExcel`, { responseType: 'blob' });
  }

  getExcel(): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`${this.baseUrl}/exportExcel`, { responseType: 'blob' });
  }

  checkAsset(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/check/${id}`, id);
  }

  checkAllPageAssets(assets: Asset[]): Observable<any> {
    const assetIDs = assets.map((asset) => asset.id);
    return this.http.put<string[]>(`${this.baseUrl}/check`, assetIDs);
  }

  startInventory(): Observable<any> {
    return this.http.post<null>('api/inventory', null);
  }

  endInventory(): Observable<any> {
    return this.http.put<null>('api/inventory', null);
  }
}
