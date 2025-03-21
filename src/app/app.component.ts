import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from '@services/rest/character.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'rickandmorty-hub';

  private characterService: CharacterService = inject(CharacterService);

  ngOnInit(): void {

    this.characterService.getCharacters().subscribe({
      next: (characters) => {
        console.log(characters);
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.characterService.getCharacter(1).subscribe({
      next: (character) => {
        console.log(character);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
