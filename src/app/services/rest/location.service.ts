import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Location } from '@models/location.model';
import { LocationServiceInterface } from '@models/services/location-service.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationRestService implements LocationServiceInterface {
  private httpClient: HttpClient = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getLocation(id: string): Observable<Location> {
    return this.httpClient.get<Location>(id);
  }
}
