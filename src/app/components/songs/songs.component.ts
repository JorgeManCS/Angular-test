import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-songs',
  standalone: true,
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  imports: [CommonModule]
})
export class SongsComponent {
  appComponent = inject(AppComponent);
  songs: any[] = [];
  artists: any = {};
  companies: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Obtiene los artistas, compañías y canciones
    this.http.get<any[]>('http://localhost:3000/artists').subscribe((artistsData) => {
      this.artists = this.createMap(artistsData);

      this.http.get<any[]>('http://localhost:3000/companies').subscribe((companiesData) => {
        this.companies = this.createMap(companiesData);

        //Crea un listado de canciones con los artistas y compañías
        this.http.get<any[]>('http://localhost:3000/songs').subscribe((songsData) => {
          this.songs = songsData.map(song => ({
            ...song,
            artistName: this.getArtistName(song.artist),
            artistImg: this.getArtistImg(song.artist),
            companyName: this.getCompanyName(song.id),
            companyCountry: this.getCompanyCountry(song.id)
          }));
          this.appComponent.setLoading(false); // Oculta spinner
        });
      });
    });
  }

  createMap(dataArray: any[]): any {
    let map: any = {};
    dataArray.forEach(item => {
      map[item.id] = item;
    });
    return map;
  }

  getArtistName(artistId: number): string {
    return this.artists[artistId]?.name || 'Artista Desconocido';
  }

  getArtistImg(artistId: number): string {
    return this.artists[artistId]?.img || 'https://example.com/default.jpg';
  }

  getCompanyName(songId: number): string {
    for (let company of Object.values(this.companies) as any[]) {
      if (company.songs.includes(songId)) {
        return company.name;
      }
    }
    return 'Compañía Desconocida';
  }

  getCompanyCountry(songId: number): string {
    for (let company of Object.values(this.companies) as any[]) {
      if (company.songs.includes(songId)) {
        return company.country;
      }
    }
    return 'País Desconocido';
  }

  viewDetails(song: any) {
    console.log(song)
    this.router.navigate(['/songs/details', song.id], { state: { songData: song } });
  }
}
