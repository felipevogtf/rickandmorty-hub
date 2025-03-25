import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Episode } from '@models/episode.model';
import { EpisodeServiceInterface } from '@models/services/episode-service.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeRestService implements EpisodeServiceInterface {
  private httpClient: HttpClient = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getEpisode(url: string): Observable<Episode> {
    return this.httpClient.get<Episode>(url);
  }
}
