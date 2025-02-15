import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, TranslateModule], 
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs: any[] = [];
  appComponent = inject(AppComponent);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.appComponent.setLoading(true); // Muestra spinner

    this.http.get('http://localhost:3000/songs').subscribe((data: any) => {
      this.songs = data;
      this.appComponent.setLoading(false); // Oculta spinner
    });
  }
}
