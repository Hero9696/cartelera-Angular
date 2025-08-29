import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pelicula } from '../../models/pelicula';
import { CarteleraService } from '../../services/cartelera';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './detalle-pelicula.html',
  styleUrls: ['./detalle-pelicula.css']
})
export class DetallePelicula {
  pelicula?: Pelicula;
  loading = true;

  mostrarModalActualizar = false;
  mostrarModalEliminar = false;

  constructor(
    private route: ActivatedRoute,
    private carteleraService: CarteleraService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPelicula();
  }

loadPelicula() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.carteleraService.getPeliculaById(id).subscribe({
      next: (data) => {
        console.log('Datos recibidos de la API:', data); // ver en consola
        this.pelicula = data; // <-- directamente, sin [0]
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar la película:', err);
        this.pelicula = undefined;
        this.loading = false;
      }
    });
  } else {
    console.warn('No se recibió un ID válido');
    this.loading = false;
    this.pelicula = undefined;
  }
}

actualizar() {
  if (this.pelicula && this.pelicula.imdbID) {
    this.carteleraService.updatePelicula(this.pelicula.imdbID, this.pelicula)
      .subscribe({
        next: (res) => {
          console.log('Película actualizada:', res);
          this.pelicula = res; // actualiza localmente los cambios
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
        }
      });
  }
}

eliminar() {
  if (this.pelicula && this.pelicula.imdbID) {
    this.carteleraService.deletePelicula(this.pelicula.imdbID)
      .subscribe({
        next: () => {
          console.log('Película eliminada');
          this.cerrarModal();
          this.router.navigate(['/']); // vuelve al inicio
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
        }
      });
  }
}





  abrirModalActualizar() { this.mostrarModalActualizar = true; }
  abrirModalEliminar() { this.mostrarModalEliminar = true; }
  cerrarModal() { this.mostrarModalActualizar = false; this.mostrarModalEliminar = false; }

  
}
