import { Location } from '@models/location.model';
import { Observable } from 'rxjs';

export interface LocationServiceInterface {
  getLocation(url: string): Observable<Location>;
}
