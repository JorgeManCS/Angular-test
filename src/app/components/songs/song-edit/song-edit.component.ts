import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { TitleService } from '../../../services/title.service';
import { CommonModule } from '@angular/common'; 
import { MaterialModule } from '../../../shared/material.module';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-song-edit',
  standalone: true,
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss'],
  imports: [FormsModule, TranslateModule, CommonModule, MaterialModule]
})
export class SongEditComponent implements OnInit {
  song: any = {
    title: '',
    artist: '',
    imageUrl: '',
    genre: '',
    company: '',
    country: '',
    year: ''
  };

  isNew = true;

  tagsGenre: string[] = [];
  tagsCompany: string[] = [];

  artists: any = [];
  companies: any = [];
  selectedArtists: number[] = [];
  selectedCompanies: number[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private titleService: TitleService,
    private translate: TranslateService
  ) {
    const songId = this.route.snapshot.paramMap.get('id');
    if (songId) {
      this.translate.get('SONGS.EDIT').subscribe(res => {
        this.titleService.setTitle(res);
      });
      this.isNew = false;
    } else
      this.translate.get('SONGS.ADD').subscribe(res => {
        this.titleService.setTitle(res);
      });
  }

  ngOnInit(): void {
    const songId = this.route.snapshot.paramMap.get('id');

    this.isLoading = true;
    
    // Obtener los artistas y discográficas desde la API
    forkJoin({
      artists: this.http.get<any[]>('http://localhost:3000/artists'),
      companies: this.http.get<any[]>('http://localhost:3000/companies')
    }).subscribe((responses) => {
      // Cuando ambas respuestas se reciben, asignamos los datos a las variables correspondientes
      this.artists = responses.artists;
      this.companies = responses.companies;

      // Desactivamos el spinner una vez que ambas respuestas se han recibido
      this.isLoading = false;
    });

    if (!this.isNew ) {
      this.isNew = false;
      this.http.get(`http://localhost:3000/songs/${songId}`).subscribe((data) => {
        this.song = data;
      });
    }
  }

  saveSong() {
    if (this.isNew) {
      this.http.post(`http://localhost:3000/songs`, this.song).subscribe(() => {
        this.router.navigate(['/songs']);
      });
    } else {
      this.http.put(`http://localhost:3000/songs/${this.song.id}`, this.song).subscribe(() => {
        this.router.navigate(['/songs']);
      });
    }
  }

  chooseYear(event: any, picker: any): void {
    this.song.year = event.getFullYear();
    picker.close();
  }

  dateFilter = (date: Date | null): boolean => {
    const currentYear = new Date().getFullYear();
    return date ? date.getFullYear() <= currentYear : false;
  };

  // Función para agregar una etiqueta de géneros
  addTagGenre(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);
    const value = input.value.trim();

    if (value && event.key === 'Enter') { // Si hay un valor y se presiona Enter
      if (!this.tagsGenre.includes(value)) { // Evita agregar etiquetas duplicadas
        this.tagsGenre.push(value);
      }
      input.value = ''; // Limpiar el campo después de agregar
    }
  }

  // Función para eliminar una etiqueta
  removeTagGenre(tag: string) {
    const index = this.tagsGenre.indexOf(tag);
    if (index >= 0) {
      this.tagsGenre.splice(index, 1);
    }
  }
}