import { Routes } from '@angular/router';
import {Home} from './components/home/home'
import {FormularioIngresar} from './components/formulario-ingresar/formulario-ingresar'
import { DetallePelicula } from './components/detalle-pelicula/detalle-pelicula';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'formulario-ingresar', component: FormularioIngresar},
    { path: 'detalle/:id', component: DetallePelicula },
];
