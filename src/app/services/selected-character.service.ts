import { computed, Injectable, signal } from '@angular/core';
import { Character } from '@models/character.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedCharacterService {
  private _selectedCharacter = signal<Character | null>(null);
  public selectedCharacter = computed(() => this._selectedCharacter());

  setSelecterCharacter(character: Character) {
    this._selectedCharacter.set(character);
  }
}
