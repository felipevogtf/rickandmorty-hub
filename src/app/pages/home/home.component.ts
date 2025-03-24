import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CharacterService } from '@services/rest/character.service';
import { PaginationResponse } from '@models/pagination-response.model';
import { Character, CharacterFilter } from '@models/character.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableComponent } from '@components/table/table.component';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatPaginatorModule,
    TableComponent,
    CommonModule,
    AvatarComponent,
    MatListModule,
    MatChipsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private characterService: CharacterService = inject(CharacterService);

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

  selectedCharacter = signal<Character | null>(null);

  ngOnInit(): void {
    this.getCharacters();
  }

  recordKeys(record: Record<string, number>): string[] {
    return Object.keys(record);
  }

  getCharacters(): void {
    this.characterService.getCharacters(this.characterFilter()).subscribe({
      next: (characters: PaginationResponse<Character>) => {
        this.characters.set(characters);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handlePageEvent($event: PageEvent) {
    console.log($event);

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
    this.selectedCharacter.set(character);
  }
}
