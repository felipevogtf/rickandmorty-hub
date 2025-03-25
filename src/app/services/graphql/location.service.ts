import { inject, Injectable } from '@angular/core';
import { Location } from '@models/location.model';
import { LocationServiceInterface } from '@models/services/location-service.model';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationGraphqlService implements LocationServiceInterface {
  private apollo: Apollo = inject(Apollo);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getLocation(id: string): Observable<Location> {
    const GET_LOCATION = gql`
      query getLocation($id: ID!) {
        location(id: $id) {
          id
          name
          type
          dimension
          residents {
            id
          }
          created
        }
      }
    `;

    return this.apollo
      .watchQuery<{ location: Location }>({
        query: GET_LOCATION,
        variables: { id },
      })
      .valueChanges.pipe(
        map((result) => {
          const location = result.data.location;

          // Formatear la lista de residentes para que sea solo una lista de IDs
          const formattedLocation: Location = {
            id: location.id,
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            residents: (location.residents as unknown as { id: string }[]).map(
              (e) => e.id,
            ),
            url: location.url,
            created: location.created,
          };
          return formattedLocation;
        }),
      );
  }
}
