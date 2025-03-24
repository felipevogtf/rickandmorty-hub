import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { Character } from '@models/character.model';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, AvatarComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() dataSource: Character[] = [];
  @Input() displayedColumns: string[] = [
    'image',
    'name',
    'species',
    'type',
    'gender',
    'status',
  ];

  @Output() selectCharacter = new EventEmitter<Character>();

  onCharacter(character: Character) {
    this.selectCharacter.emit(character);
  }
}
