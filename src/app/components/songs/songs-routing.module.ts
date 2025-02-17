import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { SongEditComponent } from './song-edit/song-edit.component';

const routes: Routes = [
  { path: '', component: SongsComponent },
  { path: 'details/:id', component: SongDetailsComponent },
  { path: 'add', component: SongEditComponent },
  { path: 'edit/:id', component: SongEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule {}