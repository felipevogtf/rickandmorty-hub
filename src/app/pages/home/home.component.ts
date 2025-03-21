import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CharacterService } from '@services/rest/character.service';
import { PaginationResponse } from '@models/pagination-response.model';
import { Character, CharacterFilter } from '@models/character.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
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

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters(
      this.characterFilter(),
    ).subscribe({
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
}
