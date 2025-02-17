import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dynamicMessage: string = '';
  showMessage: boolean = false; 

  constructor(private route: ActivatedRoute, private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const buttonNumber = Number(params.get('id'));
      if (buttonNumber === 2 || buttonNumber === 3) {
        this.setDevelopmentMessage(buttonNumber);
      }
    });
  }

  setDevelopmentMessage(buttonNumber: number): void {
    this.showMessage = true;
    this.translate.get(['MESSAGE', `SIDEBAR.BUTTON${buttonNumber}`]).subscribe(translations => {
      this.dynamicMessage = `${translations['MESSAGE']} ${translations[`SIDEBAR.BUTTON${buttonNumber}`]}`;
    });
  }
}
