import { inject, Injectable } from '@angular/core';
import { Character, CharacterFilter } from '@models/character.model';
import { PaginationResponse } from '@models/pagination-response.model';
import { CharacterServiceInterface } from '@models/services/character-service.model';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterGraphqlService implements CharacterServiceInterface {
  private apollo: Apollo = inject(Apollo);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getCharacters(
    filter?: CharacterFilter,
  ): Observable<PaginationResponse<Character>> {
    const GET_CHARACTERS = gql`
      query GetCharacters($page: Int, $filter: FilterCharacter) {
        characters(page: $page, filter: $filter) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            status
            species
            type
            gender
            origin {
              name
              id
            }
            location {
              name
              id
            }
            image
            episode {
              id
            }
            created
          }
        }
      }
    `;

    const { page, ...filterWithoutPage } = filter ?? {};

    return this.apollo
      .watchQuery<{ characters: PaginationResponse<Character> }>({
        query: GET_CHARACTERS,
        variables: {
          page,
          filter: filterWithoutPage,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          const characters = result.data.characters;

          const resultsWithEpisodeIds = characters.results.map((character) => ({
            ...character,
            episode: (character.episode as unknown as { id: string }[]).map(
              (e) => e.id,
            ),
            location: {
              ...character.location,
              url: (character.location as unknown as { id: string }).id,
            },
            origin: {
              ...character.origin,
              url: (character.origin as unknown as { id: string }).id,
            },
          }));

          return {
            ...characters,
            results: resultsWithEpisodeIds,
          };
        }),
      );
  }

  getCharacter(id: string): Observable<Character> {
    const GET_CHARACTER = gql`
      query GetCharacter($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          type
          gender
          origin {
            name
            id
          }
          location {
            name
            id
          }
          image
          episode {
            id
          }
          created
        }
      }
    `;

    return this.apollo
      .watchQuery<{ character: Character }>({
        query: GET_CHARACTER,
        variables: { id },
      })
      .valueChanges.pipe(
        map((result) => {
          const character = result.data.character;

          return {
            ...character,
            episode: (character.episode as unknown as { id: string }[]).map(
              (e) => e.id,
            ),
            location: {
              ...character.location,
              url: (character.location as unknown as { id: string }).id,
            },
            origin: {
              ...character.origin,
              url: (character.origin as unknown as { id: string }).id,
            },
          };
        }),
      );
  }
}
