import { Routes } from '@angular/router';
import {Home} from './components/home/home'
import {FormularioIngresar} from './components/formulario-ingresar/formulario-ingresar'
import {FormularioActualizar} from './components/formulario-actualizar/formulario-actualizar'
import {FormularioEliminar} from './components/formulario-eliminar/formulario-eliminar'
import { DetallePelicula } from './components/detalle-pelicula/detalle-pelicula';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'formulario-ingresar', component: FormularioIngresar},
    {path: 'formulario-actualizar', component: FormularioActualizar},
    {path: 'formulario-eliminar', component: FormularioEliminar},
    { path: 'detalle/:id', component: DetallePelicula },
];
