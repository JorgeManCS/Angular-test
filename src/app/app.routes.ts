import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'songs', loadChildren: () => import('./components/songs/songs.module').then(m => m.SongsModule) },
  { path: 'home/:id', component: HomeComponent },
  { path: '**', redirectTo: 'songs' }
];
