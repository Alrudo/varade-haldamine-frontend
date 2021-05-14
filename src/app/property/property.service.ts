import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    console.log('zawel');
    return this.http.post<Classification>(`api/class`, classification, this.httpOptions);
  }
}
