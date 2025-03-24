import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FavoriteService } from '@services/favorite.service';
import { Character } from '@models/character.model';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { SelectedCharacterService } from '@services/selected-character.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    AvatarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private favoriteService: FavoriteService = inject(FavoriteService);
  private selectedCharacterService: SelectedCharacterService = inject(
    SelectedCharacterService,
  );

  get favoriteCharacter(): Character | null {
    return this.favoriteService.favoriteCharacter();
  }

  onFavoriteCharacter(character: Character) {
    this.selectedCharacterService.setSelecterCharacter(character);
  }
}
