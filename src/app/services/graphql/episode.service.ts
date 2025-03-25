import { inject, Injectable } from '@angular/core';
import { Episode } from '@models/episode.model';
import { EpisodeServiceInterface } from '@models/services/episode-service.model';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeGraphqlService implements EpisodeServiceInterface {
  private apollo: Apollo = inject(Apollo);
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getEpisode(id: string): Observable<Episode> {
    const GET_EPISODE = gql`
      query getEpisode($id: ID!) {
        episode(id: $id) {
          id
          name
          episode
          air_date
          characters {
            id
            name
          }
        }
      }
    `;

    return this.apollo
      .watchQuery<{ episode: Episode }>({
        query: GET_EPISODE,
        variables: { id },
      })
      .valueChanges.pipe(
        map((result) => {
          const episode = result.data.episode;
          return episode;
        }),
      );
  }
}
