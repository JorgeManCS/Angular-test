import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from '../../app.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, TranslateModule], 
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs: any[] = [];
  artists: any[] = [];
  appComponent = inject(AppComponent);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.appComponent.setLoading(true); // Muestra spinner

    forkJoin([
      this.http.get('http://localhost:3000/songs'),
      this.http.get('http://localhost:3000/artists')
    ]).subscribe(([songsData, artistsData]: any) => {
      this.songs = songsData;
      this.artists = artistsData;
      this.appComponent.setLoading(false); // Oculta spinner
    });
  }

  getArtistName(artistId: number): string {
    const artist = this.artists.find(a => a.id === artistId);
    return artist ? artist.name : 'Desconocido';
  }

  getArtistImg(artistId: number): string {
    const artist = this.artists.find(a => a.id === artistId);
    return artist ? artist.img : '';
  }
}
