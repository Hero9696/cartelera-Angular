import { Component } from '@angular/core';
import { CarteleraService } from '../../services/cartelera';
import { Pelicula } from '../../models/pelicula';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, Navbar, Footer],
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
    this.getCartelera(); // carga inicial de películas
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

  // Nuevo método que recibe los filtros emitidos por el navbar
  buscar(filtros: { title: string; ubication: string }): void {
    this.filtros = filtros; // actualiza los filtros
    this.getCartelera();    // realiza la búsqueda con los filtros
  }
}
