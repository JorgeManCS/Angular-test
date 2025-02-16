import { Routes } from '@angular/router';
import { SongsComponent } from './components/songs/songs.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: '**', redirectTo: 'songs' }
];
