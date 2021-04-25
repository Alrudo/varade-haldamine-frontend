import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '@app/asset';
import { AssetInfo } from '@app/assetInfo';
import { Classification } from '@app/classification';

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
    const url = `asset/filtered?order=ASC&page=0&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }

  getFilteredAssets(id: string, name: string): Observable<JSON> {
    const url = `asset/filtered?id=${id}&name=${name}&order=ASC&page=0&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }

  getAssetById(id: string): Observable<AssetInfo> {
    const url = `${this.url}/${id}`;
    return this.http.get<AssetInfo>(url);
  }

  sendAsset(asset: AssetInfo): Observable<AssetInfo> {
    return this.http.post<AssetInfo>(this.url, asset, this.httpOptions);
  }
  forward(nextPage: number): Observable<JSON> {
    const url = `asset/filtered?order=ASC&page=${nextPage}&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }
  backward(previousPage: number): Observable<JSON> {
    const url = `asset/filtered?order=ASC&page=${previousPage}&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
  }

  fullForward(lastPage: number): Observable<JSON> {
    const url = `asset/filtered?order=ASC&page=${lastPage - 1}&size=10&sortBy=id`;
    return this.http.get<JSON>(url);
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
