import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AssetInfo } from '@app/assetInfo';
import { Classification } from '@app/classification';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  httpParams = new HttpParams();
  private url = 'asset';
  private filterUrl = 'asset/filtered?';
  private filterParams = new HttpParams();
  private pageParams = new HttpParams().set('page', 0 + '');
  private sortParams = new HttpParams().set('sortBy', 'id').set('order', 'ASC');

  constructor(private http: HttpClient) {}

  getAssets(): Observable<JSON> {
    const url = `asset/filtered?order=ASC&page=0&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }

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
    const url = `class`;
    return this.http.get<Classification[]>(url);
  }

  getPossessor(): Observable<[]> {
    const url = `possessor`;
    return this.http.get<[]>(url);
  }

  getMajorAssets(): Observable<[]> {
    const url = `kit/majorAssets`;
    return this.http.get<[]>(url);
  }
}
