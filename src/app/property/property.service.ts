import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Asset } from '@app/asset';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private url = '/asset';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.url);
  }
}
