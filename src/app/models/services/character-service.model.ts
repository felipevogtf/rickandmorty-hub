import { CharacterFilter, Character } from "@models/character.model";
import { PaginationResponse } from "@models/pagination-response.model";
import { Observable } from "rxjs";

export interface CharacterServiceInterface {
  getCharacters(filter?: CharacterFilter): Observable<PaginationResponse<Character>>;
  getCharacter(url: string): Observable<Character>;
}