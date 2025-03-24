import { computed, Injectable, signal } from '@angular/core';
import { Character } from '@models/character.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _favoriteCharacter = signal<Character | null>(null);
  public favoriteCharacter = computed(() => this._favoriteCharacter());

  setFavoriteCharacter(character: Character) {
    this._favoriteCharacter.set(character);
  }
}
