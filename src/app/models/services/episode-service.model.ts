import { Episode } from '@models/episode.model';
import { Observable } from 'rxjs';

export interface EpisodeServiceInterface {
  getEpisode(url: string): Observable<Episode>;
}
