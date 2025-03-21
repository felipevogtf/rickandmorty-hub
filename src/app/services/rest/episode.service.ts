import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Episode, EpisodeFilter } from '@models/episode.model';
import { PaginationResponse } from '@models/pagination-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private httpClient: HttpClient = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getEpisodes(filter?: EpisodeFilter): Observable<PaginationResponse<Episode>> {
    const url = `${environment.REST_API}/episode`;
    let params = new HttpParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.httpClient.get<PaginationResponse<Episode>>(url, { params });
  }

  getEpisode(id: number): Observable<Episode> {
    return this.httpClient.get<Episode>(
      `${environment.REST_API}/episode/${id}`,
    );
  }
}
