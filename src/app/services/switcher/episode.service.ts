import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Episode } from '@models/episode.model';
import { EpisodeServiceInterface } from '@models/services/episode-service.model';
import { EpisodeGraphqlService } from '@services/graphql/episode.service';
import { EpisodeRestService } from '@services/rest/episode.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService implements EpisodeServiceInterface {
  private episodeRestService = inject(EpisodeRestService);
  private episodeGraphqlService = inject(EpisodeGraphqlService);

  private useGraphql = environment.useGraphql;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getEpisode(url: string): Observable<Episode> {
    return this.useGraphql
      ? this.episodeGraphqlService.getEpisode(url)
      : this.episodeRestService.getEpisode(url);
  }
}
