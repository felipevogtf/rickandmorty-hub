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
import { CharacterService } from '@services/rest/character.service';
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
import { MatChipsModule } from '@angular/material/chips';
import { CharacterDetailComponent } from '@components/character-detail/character-detail.component';
import { LocationService } from '@services/rest/location.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { FavoriteService } from '@services/favorite.service';
import { SelectedCharacterService } from '@services/selected-character.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FilterComponent } from '@components/filter/filter.component';
@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatPaginatorModule,
    TableComponent,
    CommonModule,
    MatChipsModule,
    MatListModule,
    CharacterDetailComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    FilterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator')
  paginator!: MatPaginator;

  private characterService = inject(CharacterService);
  private locationService = inject(LocationService);
  private favoriteService = inject(FavoriteService);
  private selecterCharacterService = inject(SelectedCharacterService);

  get selectedCharacter() {
    return this.selecterCharacterService.selectedCharacter();
  }

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

  charactersLoader = signal<boolean>(false);
  locationLoader = signal<boolean>(false);
  originLoader = signal<boolean>(false);

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
    });
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  recordKeys(record: Record<string, number>): string[] {
    return Object.keys(record);
  }

  getCharacters(): void {
    this.charactersLoader.set(true);
    this.characterService.getCharacters(this.characterFilter()).subscribe({
      next: (characters: PaginationResponse<Character>) => {
        this.characters.set(characters);
        this.charactersLoader.set(false);
      },
      error: (error) => {
        console.error(error);
        this.charactersLoader.set(false);
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

  filterCharacters(characterFilter: CharacterFilter) {
    this.characterFilter.set(characterFilter);
    this.paginator.pageIndex = 0;
    this.getCharacters();
  }

  handleCharacter(character: Character) {
    this.selecterCharacterService.setSelecterCharacter(character);
  }

  handleLikeCharacter(character: Character) {
    this.favoriteService.setFavoriteCharacter(character);
  }

  getLocation(locationUrl: string): void {
    this.locationLoader.set(true);

    if (!locationUrl) {
      this.locationCharacters.set([]);
      this.locationLoader.set(false);
      return;
    }

    this.locationService
      .getLocationByURL(locationUrl)
      .pipe(
        switchMap((location) => {
          if (location.residents.length == 0) {
            return of([]);
          }

          const residents = location.residents.slice(0, 3);

          const characterRequests = residents.map((resident) => {
            return this.characterService.getCharacterByURL(resident);
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

  getOrigin(originUrl: string): void {
    this.originLoader.set(true);

    if (!originUrl) {
      this.originCharacters.set([]);
      this.originLoader.set(false);
      return;
    }

    this.locationService
      .getLocationByURL(originUrl)
      .pipe(
        switchMap((location) => {
          if (location.residents.length == 0) {
            return of([]);
          }

          const residents = location.residents.slice(0, 3);

          const characterRequests = residents.map((resident) => {
            return this.characterService.getCharacterByURL(resident);
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
          console.error(error);
          this.originLoader.set(false);
        },
      });
  }

  getCharacter(url: string): void {
    this.characterService.getCharacterByURL(url).subscribe({
      next: (character) => {
        this.selecterCharacterService.setSelecterCharacter(character);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
