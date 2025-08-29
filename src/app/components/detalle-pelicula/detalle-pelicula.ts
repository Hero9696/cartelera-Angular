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


  abrirModalActualizar() { this.mostrarModalActualizar = true; }
  abrirModalEliminar() { this.mostrarModalEliminar = true; }
  cerrarModal() { this.mostrarModalActualizar = false; this.mostrarModalEliminar = false; }

  actualizar() { console.log('Actualizar:', this.pelicula); this.cerrarModal(); }
  eliminar() { console.log('Eliminar:', this.pelicula); this.router.navigate(['/']); this.cerrarModal(); }
}
