import { Injectable } from '@angular/core';
import { Property } from '@app/home/property';
import { PROPERTIES } from '@app/home/mock_properties';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor() {}

  getProperties(): Observable<Property[]> {
    return of(PROPERTIES);
  }

  getProperty(id: number): Observable<Property> {
    return of(PROPERTIES.find((property) => property.id === id));
  }
}
