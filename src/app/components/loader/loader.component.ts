import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule] // Añade CommonModule aquí
})
export class LoaderComponent implements OnChanges {
  @Input() show: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    console.log('LoaderComponent - show:', this.show);
  }
}