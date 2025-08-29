import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class CarteleraService {
  private apiUrl = 'https://movie.azurewebsites.net/api/cartelera';

  constructor(private http: HttpClient) {}

  getCartelera(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}?title=&ubication=`);
  }

  getCarteleraPorUrl(url: string): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(url);
  }

  createPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  updatePelicula(imdbID: string, pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}?imdbID=${imdbID}`, pelicula);
  }

getPeliculaById(id: string) {
  const url = `https://movie.azurewebsites.net/api/cartelera?imdbID=${id}`;
  return this.http.get<Pelicula>(url); // retorna un objeto directamente
}

deletePelicula(imdbID: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}?imdbID=${imdbID}`);
}
}
