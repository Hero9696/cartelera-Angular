import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarteleraService } from '../../services/cartelera';
import { Pelicula } from '../../models/pelicula';
import { Navbar } from "../navbar/navbar";
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-form-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './formulario-ingresar.html',
  styleUrls: ['./formulario-ingresar.css']
})
export class FormularioIngresar {
  pelicula: Pelicula = {
    imdbID: '',
    Title: '',
    Year: '',
    Type: '',
    Poster: '',
    Estado: true,
    description: '',
    Ubication: ''
  };

  modoActualizar = false; // false = crear, true = actualizar
  loading = false;
  mensaje = '';

  constructor(private carteleraService: CarteleraService) {}

  guardar(): void {
    this.loading = true;
    if (this.modoActualizar) {
      this.carteleraService.updatePelicula(this.pelicula.imdbID, this.pelicula)
        .subscribe({
          next: () => {
            this.mensaje = 'Película actualizada correctamente';
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.mensaje = 'Error al actualizar la película';
            this.loading = false;
          }
        });
    } else {
      this.carteleraService.createPelicula(this.pelicula)
        .subscribe({
          next: () => {
            this.mensaje = 'Película creada correctamente';
            this.loading = false;
            this.resetForm();
          },
          error: (err) => {
            console.error(err);
            this.mensaje = 'Error al crear la película';
            this.loading = false;
          }
        });
    }
  }

  resetForm(): void {
    this.pelicula = {
      imdbID: '',
      Title: '',
      Year: '',
      Type: '',
      Poster: '',
      Estado: true,
      description: '',
      Ubication: ''
    };
    this.modoActualizar = false;
  }
}
