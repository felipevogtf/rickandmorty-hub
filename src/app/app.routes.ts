import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Rick and Morty Hub',
    component: HomeComponent,
  }
];
