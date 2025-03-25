import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Location } from '@models/location.model';
import { LocationServiceInterface } from '@models/services/location-service.model';
import { LocationGraphqlService } from '@services/graphql/location.service';
import { LocationRestService } from '@services/rest/location.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService implements LocationServiceInterface {
  private locationRestService = inject(LocationRestService);
  private locationGraphqlService = inject(LocationGraphqlService);

  private useGraphql = environment.useGraphql;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getLocation(id: string): Observable<Location> {
    return this.useGraphql
      ? this.locationGraphqlService.getLocation(id)
      : this.locationRestService.getLocation(id);
  }
}
