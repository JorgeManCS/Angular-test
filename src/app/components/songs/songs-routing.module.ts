import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs.component';
import { SongDetailsComponent } from './song-details/song-details.component';

const routes: Routes = [
  { path: '', component: SongsComponent },
  { path: 'details/:id', component: SongDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule {}