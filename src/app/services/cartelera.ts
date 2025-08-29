import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class CarteleraService {
  private apiUrl = 'https://movie.azurewebsites.net/api/cartelera?title=&ubication=';

  constructor(private http: HttpClient) {}

  getCartelera(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // Nuevo método para URL personalizada
  getCarteleraPorUrl(url: string): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(url);
  }
}
