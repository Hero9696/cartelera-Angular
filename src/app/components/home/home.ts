import { Component } from '@angular/core';
import { CarteleraService } from '../../services/cartelera';
import { Pelicula } from '../../models/pelicula';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home {
  peliculas: Pelicula[] = [];
  loading = false;

  filtros = {
    title: '',
    ubication: ''
  };

  constructor(private carteleraService: CarteleraService) {
    // Cargar la cartelera al crear el componente
    this.getCartelera();
  }

  getCartelera(): void {
    this.loading = true;
    const url = `https://movie.azurewebsites.net/api/cartelera?title=${this.filtros.title}&ubication=${this.filtros.ubication}`;
    this.carteleraService.getCarteleraPorUrl(url).subscribe({
      next: (data) => {
        this.peliculas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  buscar(): void {
    this.getCartelera();
  }
}