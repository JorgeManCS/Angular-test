import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsRoutingModule } from './songs-routing.module';
import { SongsComponent } from './songs.component';
import { SongDetailsComponent } from './song-details/song-details.component';

@NgModule({
  imports: [
    CommonModule,
    SongsRoutingModule,
    SongsComponent,
    SongDetailsComponent
  ]
})
export class SongsModule {}