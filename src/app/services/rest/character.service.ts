import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Character, CharacterFilter } from '@models/character.model';
import { PaginationResponse } from '@models/pagination-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private httpClient: HttpClient = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getCharacters(
    filter?: CharacterFilter,
  ): Observable<PaginationResponse<Character>> {
    const url = `${environment.REST_API}/character`;
    let params = new HttpParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.httpClient.get<PaginationResponse<Character>>(url, { params });
  }

  getCharacter(id: number): Observable<Character> {
    return this.httpClient.get<Character>(
      `${environment.REST_API}/character/${id}`,
    );
  }
}
