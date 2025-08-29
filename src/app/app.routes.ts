import { Routes } from '@angular/router';
import {Home} from './components/home/home'
import {Cartelera} from './components/cartelera/cartelera'
import {FormularioIngresar} from './components/formulario-ingresar/formulario-ingresar'
import {FormularioActualizar} from './components/formulario-actualizar/formulario-actualizar'
import {FormularioEliminar} from './components/formulario-eliminar/formulario-eliminar'

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'cartelera', component: Cartelera},
    {path: 'formulario-ingresar', component: FormularioIngresar},
    {path: 'formulario-actualizar', component: FormularioActualizar},
    {path: 'formulario-eliminar', component: FormularioEliminar}
];
