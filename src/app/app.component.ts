import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FavoriteService } from '@services/favorite.service';
import { Character } from '@models/character.model';
import { SelectedCharacterService } from '@services/selected-character.service';
import { FavoriteCharacterComponent } from '@components/favorite-character/favorite-character.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, FavoriteCharacterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private favoriteService = inject(FavoriteService);
  private selectedCharacterService = inject(SelectedCharacterService);

  get favoriteCharacter(): Character | null {
    return this.favoriteService.favoriteCharacter();
  }

  onFavoriteCharacter(character: Character) {
    this.selectedCharacterService.setSelecterCharacter(character);
  }
}
