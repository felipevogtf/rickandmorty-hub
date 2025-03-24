import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharacterFilter } from '@models/character.model';

@Component({
  selector: 'app-filter',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() filter = new EventEmitter<CharacterFilter>();
  private formBuilder = inject(FormBuilder);

  filterForm = this.formBuilder.group({
    name: [''],
    status: [''],
    gender: [''],
  });

  submit(): void {
    const { name, status, gender } = this.filterForm.value;
    const characterFilter: CharacterFilter = {
      page: 0,
    };

    if (name) {
      characterFilter.name = name;
    }

    if (status) {
      characterFilter.status = status as CharacterFilter['status'];
    }

    if (gender) {
      characterFilter.gender = gender as CharacterFilter['gender'];
    }

    this.filter.emit(characterFilter);
  }

  clear(): void {
    this.filterForm.reset();
    this.submit();
  }
}
