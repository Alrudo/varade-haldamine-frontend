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
  private url = 'api/asset';
  httpParams = new HttpParams();
  private url = 'asset';
  private filterUrl = 'asset/filtered?';
  private filterParams = new HttpParams();
  private pageParams = new HttpParams().set('page', 0 + '');
  private sortParams = new HttpParams().set('sortBy', 'id').set('order', 'ASC');

  constructor(private http: HttpClient) {}

  getAssets(): Observable<JSON> {
    const url = `api/asset/filtered?order=ASC&page=0&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }

  getFilteredAssets(
    id: string,
    name: string,
    active: string,
    building: string,
    lifeMonths: string,
    mainPlusSub: string
  ): Observable<JSON> {
    const url = `api/asset/filtered?active=${active}&buildingAbbreviationPlusRoom=${building}&id=${id}&lifeMonthsLeft=${lifeMonths}&mainClassPlusSubclass=${mainPlusSub}&name=${name}&order=ASC&page=0&size=10&sortBy=id`;
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
  forward(
    nextPage: number,
    id: string,
    name: string,
    active: string,
    building: string,
    lifeMonths: string,
    mainPlusSub: string
  ): Observable<JSON> {
    const url = `api/asset/filtered?active=${active}&buildingAbbreviationPlusRoom=${building}&id=${id}&lifeMonthsLeft=${lifeMonths}&mainClassPlusSubclass=${mainPlusSub}&name=${name}&order=ASC&page=${nextPage}&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }
  backward(
    previousPage: number,
    id: string,
    name: string,
    active: string,
    building: string,
    lifeMonths: string,
    mainPlusSub: string
  ): Observable<JSON> {
    const url = `api/asset/filtered?active=${active}&buildingAbbreviationPlusRoom=${building}&id=${id}&lifeMonthsLeft=${lifeMonths}&mainClassPlusSubclass=${mainPlusSub}&name=${name}&order=ASC&page=${previousPage}&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }

  fullForward(
    lastPage: number,
    id: string,
    name: string,
    active: string,
    building: string,
    lifeMonths: string,
    mainPlusSub: string
  ): Observable<JSON> {
    const url = `api/asset/filtered?active=${active}&buildingAbbreviationPlusRoom=${building}&id=${id}&lifeMonthsLeft=${lifeMonths}&mainClassPlusSubclass=${mainPlusSub}&name=${name}&order=ASC&page=${
      lastPage - 1
    }&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }

  fullBackward(
    page: number,
    id: string,
    name: string,
    active: string,
    building: string,
    lifeMonths: string,
    mainPlusSub: string
  ): Observable<JSON> {
    const url = `api/asset/filtered?active=${active}&buildingAbbreviationPlusRoom=${building}&id=${id}&lifeMonthsLeft=${lifeMonths}&mainClassPlusSubclass=${mainPlusSub}&name=${name}&order=ASC&page=${page}&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
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
    const url = `api/asset/audit/${asset.id}`;
    return this.http.get<JSON>(url);
  }

  getAssetAuditForward(asset: AssetInfo, nextAsset: number): Observable<AssetInfo> {
    const url = `api/asset/audit?assetId=${asset.id}&index=${nextAsset}`;
    return this.http.get<AssetInfo>(url);
  }

  getAssetAuditBackwards(asset: AssetInfo, previousAsset: number): Observable<AssetInfo> {
    const url = `api/asset/audit?assetId=${asset.id}&index=${previousAsset}`;
    return this.http.get<AssetInfo>(url);
  }

  getAssetAuditFullForward(asset: AssetInfo, maxNumber: number): Observable<AssetInfo> {
    const url = `api/asset/audit?assetId=${asset.id}&index=${maxNumber - 1}`;
    return this.http.get<AssetInfo>(url);
  }
  getAssetAuditFullBackwards(asset: AssetInfo, zero: number): Observable<AssetInfo> {
    const url = `api/asset/audit?assetId=${asset.id}&index=${zero}`;
    return this.http.get<AssetInfo>(url);
  }

  changeAsset(asset: JSON, id: string): Observable<JSON> {
    const url = `api/asset/${id}`;
    return this.http.put<JSON>(url, asset, this.httpOptions);
  }

  getUserRole(): Observable<string> {
    // @ts-ignore
    return this.http.get<string>(`api/asset/accountt`, { responseType: 'text' });
  }

  addClassification(classification: Classification): Observable<Classification> {
    return this.http.post<Classification>(`api/class`, classification, this.httpOptions);
  }

  getExcel(): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`api/asset/exportExcel`, { responseType: 'blob' });
  }
}
