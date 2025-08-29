import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'] // <-- corregido
})
export class Navbar {
  @Input() mostrarBusqueda: boolean = true;
  
  @Output() buscarEvent = new EventEmitter<{title: string, ubication: string}>();

  filtros = {
    title: '',
    ubication: ''
  };

  buscar(): void {
    // Emitir los filtros al componente padre
    this.buscarEvent.emit({ ...this.filtros });
  }
}