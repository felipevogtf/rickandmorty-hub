import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { Character } from '@models/character.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-character-detail',
  imports: [
    MatListModule,
    MatCardModule,
    AvatarComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent {
  @Input({ required: true }) character: Character | null = null;
  @Input({ required: true }) locationCharacters: Character[] | null = null;
  @Input({ required: true }) originCharacters: Character[] | null = null;
  @Input({ required: true }) isLocationLoading = false;
  @Input({ required: true }) isOriginLoading = false;
  @Input({ required: true }) isLiked = false;
  @Output() selectCharacter = new EventEmitter<Character>();
  @Output() likeCharacter = new EventEmitter<Character>();

  onLike(character: Character) {
    this.likeCharacter.emit(character);
  }

  onCharacter(character: Character) {
    this.selectCharacter.emit(character);
  }
}
