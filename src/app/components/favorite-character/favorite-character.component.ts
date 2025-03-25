import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { Character } from '@models/character.model';

@Component({
  selector: 'app-favorite-character',
  imports: [MatCardModule, AvatarComponent],
  templateUrl: './favorite-character.component.html',
  styleUrl: './favorite-character.component.scss',
})
export class FavoriteCharacterComponent {

  @Input() character: Character | null = null;
  @Output() characterClick = new EventEmitter<Character>();

  onCharacterClick(character: Character) {
    this.characterClick.emit(character);
  }
}
