import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Location, LocationFilter } from '@models/location.model';
import { PaginationResponse } from '@models/pagination-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private httpClient: HttpClient = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getLocations(
    filter?: LocationFilter,
  ): Observable<PaginationResponse<Location>> {
    const url = `${environment.REST_API}/location`;
    let params = new HttpParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.httpClient.get<PaginationResponse<Location>>(url, { params });
  }

  getLocation(id: number): Observable<Location> {
    return this.httpClient.get<Location>(
      `${environment.REST_API}/location/${id}`,
    );
  }

  getLocationByURL(url: string): Observable<Location> {
    return this.httpClient.get<Location>(url);
  }
}
