import { Component, ChangeDetectorRef } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, LoaderComponent, SidebarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false; // Estado de la carga
  sidebarOpen = false; // Estado del menú lateral
  isLanguageMenuOpen = false; // Estado del menú de idioma (abierto o cerrado)
  pageTitle = ''; // Titulo del header
  showBackButton = false; // Boolean para mostrar u ocultar el botón de retroceso

  constructor(private translate: TranslateService, private cdr: ChangeDetectorRef, private router: Router, private titleService: TitleService) {
    this.translate.setDefaultLang('es'); 
    this.translate.use('es'); 

    this.titleService.title$.subscribe(title => {
      this.pageTitle = title;
    
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    });
    
  }

  // Cambiar idioma
  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.isLanguageMenuOpen = false;
    this.updateTitle(this.router.url);
  }

  setLoading(state: boolean) {
    this.loading = state;
    this.cdr.detectChanges();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.url);
        this.updateBackButton(event.url);
      }
    });
  }

  updateTitle(url: string) {
    if (url === '/songs') {
      this.translate.get('SIDEBAR.BUTTON1').subscribe(res => {
        this.pageTitle = res;
        this.titleService.setTitle(res); 
      });
    } else if (url.includes('/songs/')) {

      return;
    } else {
      if (url.includes('/home/2')) {
        this.translate.get('SIDEBAR.BUTTON2').subscribe(res => {
          this.pageTitle = res;
          this.titleService.setTitle(res);
        });
      } else if (url.includes('/home/3')) {
        this.translate.get('SIDEBAR.BUTTON3').subscribe(res => {
          this.pageTitle = res;
          this.titleService.setTitle(res);
        });
      } else {
        this.pageTitle = '';
      }
    }
  }
  
  

  updateBackButton(url: string) {
    this.showBackButton = url.includes('/songs/');
  }

  updateTitleFromChild(newTitle: string) {
    this.pageTitle = newTitle;
  }  

  goBack() {
    window.history.back();
  }
}