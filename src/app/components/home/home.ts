import { Component } from '@angular/core';
import { CarteleraService } from '../../services/cartelera';
import { Pelicula } from '../../models/pelicula';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { Cartelera } from '../cartelera/cartelera';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, Cartelera],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home {
  peliculas: Pelicula[] = [];
  loading: boolean = true;

  constructor(private carteleraService: CarteleraService) {
    // Llamamos la API directamente desde el constructor
    this.carteleraService.getCartelera().subscribe({
      next: (data) => {
        this.peliculas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar cartelera', err);
        this.loading = false;
      }
    });
  }
}