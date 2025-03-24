import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input({ required: true }) src = '';
  @Input({ required: true }) alt = '';
  @Input() size: 'xl' | 'md' = 'md';


  get sizeClass() {
    return this.size === 'xl' ? 'avatar--xl' : 'avatar--md';
  }
}
