import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CharacterService } from '@services/switcher/character.service';

import { PaginationResponse } from '@models/pagination-response.model';
import { Character, CharacterFilter } from '@models/character.model';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { TableComponent } from '@components/table/table.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { CharacterDetailComponent } from '@components/character-detail/character-detail.component';
import { LocationService } from '@services/switcher/location.service';
import { forkJoin, of, switchMap, take } from 'rxjs';
import { FavoriteService } from '@services/favorite.service';
import { SelectedCharacterService } from '@services/selected-character.service';
import { FilterComponent } from '@components/filter/filter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EpisodeService } from '@services/switcher/episode.service';
import { Episode } from '@models/episode.model';
@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatPaginatorModule,
    TableComponent,
    CommonModule,
    MatListModule,
    CharacterDetailComponent,
    FilterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  // Inject services
  private characterService = inject(CharacterService);
  private locationService = inject(LocationService);
  private episodeService = inject(EpisodeService);
  private favoriteService = inject(FavoriteService);
  private selecterCharacterService = inject(SelectedCharacterService);
  private _snackBar = inject(MatSnackBar);

  

  // Main signals
  characters = signal<PaginationResponse<Character>>({
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  });

  characterFilter = signal<CharacterFilter>({
    page: 0,
  });

  locationCharacters = signal<Character[] | null>(null);
  originCharacters = signal<Character[] | null>(null);
  randomEpisode = signal<Episode | null>(null);

  // Loader signals
  charactersLoader = signal<boolean>(false);
  locationLoader = signal<boolean>(false);
  originLoader = signal<boolean>(false);
  epidoseLoader = signal<boolean>(false);


  // getters
  get selectedCharacter() {
    return this.selecterCharacterService.selectedCharacter();
  }

  // Computed properties
  totalSpecies = computed(() => {
    return this.characters().results.reduce(
      (acc: Record<string, number>, character) => {
        if (!acc[character.species]) {
          acc[character.species] = 0;
        }

        acc[character.species] += 1;

        return acc;
      },
      {},
    );
  });

  totalTypes = computed(() => {
    return this.characters().results.reduce(
      (acc: Record<string, number>, character) => {
        if (!acc[character.type]) {
          acc[character.type] = 0;
        }

        acc[character.type] += 1;

        return acc;
      },
      {},
    );
  });

  selectedCharacterLiked = computed(() => {
    if (!this.favoriteService.favoriteCharacter()) {
      return false;
    }

    if (!this.selectedCharacter) {
      return false;
    }

    if (
      this.favoriteService.favoriteCharacter()!.id === this.selectedCharacter.id
    ) {
      return true;
    }

    return false;
  });

  constructor() {
    effect(() => {
      if (this.selectedCharacter) {
        this.getLocation(this.selectedCharacter.location.url);
        this.getOrigin(this.selectedCharacter.origin.url);
      }

      if (this.selectedCharacter && this.selectedCharacter.episode.length > 0) {
        const randomEpisodeIndex = Math.floor(
          Math.random() * this.selectedCharacter.episode.length,
        );
        this.getEpisode(this.selectedCharacter.episode[randomEpisodeIndex]);
      }
    });
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  /**
   * Get the keys of a record
   * @param record
   * @returns list of keys
   */
  recordKeys(record: Record<string, number>): string[] {
    return Object.keys(record);
  }

  /**
   * Set the character filter and get characters
   * @param characterFilter
   */
  filterCharacters(characterFilter: CharacterFilter) {
    this.characterFilter.set(characterFilter);
    this.paginator.pageIndex = 0;
    this.getCharacters();
  }

  /**
   * Get characters with the current filter
   */
  getCharacters(): void {
    this.charactersLoader.set(true);
    this.characterService.getCharacters(this.characterFilter()).subscribe({
      next: (characters: PaginationResponse<Character>) => {
        this.characters.set(characters);
        this.charactersLoader.set(false);
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open(error.error.error, 'Close', {
          duration: 3000,
        });
        this.charactersLoader.set(false);
      },
    });
  }

  /**
   * Get location characters by url and
   * get the first 3 characters from the same location
   * @param locationUrl
   */
  getLocation(locationUrl: string): void {
    this.locationLoader.set(true);

    if (!locationUrl) {
      this.locationCharacters.set([]);
      this.locationLoader.set(false);
      return;
    }

    this.locationService
      .getLocation(locationUrl)
      .pipe(
        switchMap((location) => {
          if (location.residents.length == 0) {
            return of([]);
          }

          const residents = location.residents.slice(0, 3);

          const characterRequests = residents.map((resident) => {
            return this.characterService.getCharacter(resident).pipe(take(1));
          });

          return forkJoin(characterRequests);
        }),
      )
      .subscribe({
        next: (characters) => {
          this.locationCharacters.set(characters);
          this.locationLoader.set(false);
        },
        error: (error) => {
          console.error(error);
          this.locationLoader.set(false);
        },
      });
  }

  /**
   * Get origin characters by url and
   * get the first 3 characters from the same origin
   * @param originUrl
   */
  getOrigin(originUrl: string): void {
    this.originLoader.set(true);

    if (!originUrl) {
      this.originCharacters.set([]);
      this.originLoader.set(false);
      return;
    }

    this.locationService
      .getLocation(originUrl)
      .pipe(
        switchMap((location) => {
          if (location.residents.length == 0) {
            return of([]);
          }

          const residents = location.residents.slice(0, 3);

          const characterRequests = residents.map((resident) => {
            return this.characterService.getCharacter(resident).pipe(take(1));
          });

          return forkJoin(characterRequests);
        }),
      )
      .subscribe({
        next: (characters) => {
          this.originCharacters.set(characters);
          this.originLoader.set(false);
        },
        error: (error) => {
          console.log(error);
          this.originLoader.set(false);
        },
      });
  }

  /**
   * Get a character by url
   * @param url
   */
  getCharacter(url: string): void {
    this.characterService.getCharacter(url).subscribe({
      next: (character) => {
        this.selecterCharacterService.setSelecterCharacter(character);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Get a episode by url
   * @param url
   */
  getEpisode(url: string): void {
    this.epidoseLoader.set(true);

    this.episodeService.getEpisode(url).subscribe({
      next: (episode) => {
        this.epidoseLoader.set(false);
        this.randomEpisode.set(episode);
      },
      error: (error) => {
        console.error(error);
        this.epidoseLoader.set(false);
      },
    });
  }

  handlePageEvent($event: PageEvent) {
    if ($event.pageIndex >= this.characters().info.pages) {
      return;
    }

    this.characterFilter.set({
      ...this.characterFilter(),
      page: $event.pageIndex + 1,
    });

    this.getCharacters();
  }

  handleCharacter(character: Character) {
    this.selecterCharacterService.setSelecterCharacter(character);
  }

  handleLikeCharacter(character: Character) {
    this.favoriteService.setFavoriteCharacter(character);
  }
}
