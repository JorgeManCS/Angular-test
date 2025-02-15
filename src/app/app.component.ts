import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SongsComponent } from './components/songs/songs.component'; // Importa el componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, SongsComponent], // Asegúrate de importar TranslateModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es'); // Establecer español como idioma por defecto
    this.translate.use('es'); // Usar español como idioma inicial
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
