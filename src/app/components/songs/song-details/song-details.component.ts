import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-song-details',
  standalone: true,
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss'],
  imports: [CommonModule, TranslateModule]
})
export class SongDetailsComponent implements OnInit {
  song: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private titleService: TitleService,
    private translate: TranslateService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.song = navigation?.extras.state?.['songData'];
    if (!this.song) {
      this.router.navigate(['/songs']);
    } else {
      this.titleService.setTitle(this.song.title);
    }
  }

  ngOnInit(): void {}

  editSong() {
    this.router.navigate(['/songs/edit', this.song.id]);
  }

  deleteSong() {
    let deleteMessage = '';
    this.translate.get('SONGS.DELETE').subscribe(res => {
      deleteMessage = res
    });
    if (confirm(deleteMessage)) {
      this.http.delete(`http://localhost:3000/songs/${this.song.id}`).subscribe(() => {
        this.router.navigate(['/songs']);
      });
    }
  }
}
