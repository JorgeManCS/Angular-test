import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './components/songs/songs.component';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, SongsComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false; // Estado de la carga

  constructor(private translate: TranslateService, private cdr: ChangeDetectorRef) {
    this.translate.setDefaultLang('es'); 
    this.translate.use('es'); 
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  setLoading(state: boolean) {
    this.loading = state;
    this.cdr.detectChanges();
  }
}