import { Component, ChangeDetectorRef } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

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

  constructor(private translate: TranslateService, private cdr: ChangeDetectorRef, private router: Router) {
    this.translate.setDefaultLang('es'); 
    this.translate.use('es'); 
  }

  // Cambiar idioma
  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.isLanguageMenuOpen = false;
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
      }
    });
  }

  updateTitle(url: string) {
    if (url.includes('/songs')) {
      this.translate.get('SIDEBAR.BUTTON1').subscribe(res => this.pageTitle = res);
    } else if (url.includes('/home/2')) {
      this.translate.get('SIDEBAR.BUTTON2').subscribe(res => this.pageTitle = res);
    } else if (url.includes('/home/3')) {
      this.translate.get('SIDEBAR.BUTTON3').subscribe(res => this.pageTitle = res);
    } else {
      this.pageTitle = ''
    }
  }
}