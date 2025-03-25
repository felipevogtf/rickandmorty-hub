import { inject, Injectable } from '@angular/core';
import { CharacterServiceInterface } from '@models/services/character-service.model';
import { CharacterRestService } from '@services/rest/character.service';
import { CharacterGraphqlService } from '@services/graphql/character.service';
import { CharacterFilter, Character } from '@models/character.model';
import { PaginationResponse } from '@models/pagination-response.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService implements CharacterServiceInterface {
  private characterRestService = inject(CharacterRestService);
  private characterGraphService = inject(CharacterGraphqlService);

  private useGraphql = environment.useGraphql;
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getCharacters(
    filter?: CharacterFilter,
  ): Observable<PaginationResponse<Character>> {
    return this.useGraphql
      ? this.characterGraphService.getCharacters(filter)
      : this.characterRestService.getCharacters(filter);
  }

  getCharacter(id: string): Observable<Character> {
    return this.useGraphql
      ? this.characterGraphService.getCharacter(id)
      : this.characterRestService.getCharacter(id);
  }
}
