import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { LocationFilter } from '@models/location.model';
import { PaginationResponse } from '@models/pagination-response.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private httpClient: HttpClient = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  getLocations(
    filter?: LocationFilter
  ) {
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

  getLocation(id: number) {
    return this.httpClient.get<Location>(
      `${environment.REST_API}/location/${id}`
    );
  }
}
