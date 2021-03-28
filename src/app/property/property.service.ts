import { Injectable } from '@angular/core';
import { Property } from '@app/property/property';
import { PROPERTIES } from '@app/property/mock_properties';
import { Observable, of } from 'rxjs';
import { Vara } from '@app/property/vara';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private url = '/asset';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return of(PROPERTIES);
  }

  getProperty(id: number): Observable<Property> {
    return of(PROPERTIES.find((property) => property.id === id));
  }

  getVara(): Observable<Vara[]> {
    return this.http.get<Vara[]>(this.url);
  }
}
