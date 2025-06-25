import { Routes } from '@angular/router';
import { IndiceComponent } from './components/indice/indice.component';

import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { ListarvehiculoComponent } from './components/vehiculo/listarvehiculo/listarvehiculo.component';
import { ListarubicacionregistroComponent } from './components/ubicacion-registro/listarubicacion-registro/listarubicacion-registro.component';
import { ListarrutaComponent } from './components/ruta/listarruta/listarruta.component';
import { ListarrolComponent } from './components/rol/listarrol/listarrol.component';
import { ListarreclamoComponent } from './components/reclamo/listarreclamo/listarreclamo.component';
import { ListardispositivoGPSComponent } from './components/dispositivo-gps/listardispositivo-gps/listardispositivo-gps.component';
import { ListardenunciaComponent } from './components/denuncia/listardenuncia/listardenuncia.component';
import { ListarconsultaComponent } from './components/consulta/listarconsulta/listarconsulta.component';
import { ListarcomisariaComponent } from './components/comisaria/listarcomisaria/listarcomisaria.component';
import { ListaralertaComponent } from './components/alerta/listaralerta/listaralerta.component';
import { ListarrespuestaComponent } from './components/respuesta/listarrespuesta/listarrespuesta.component';
import { InsertareditarComponent } from './components/usuario/insertareditar/insertareditar.component';
import { InsertareditarconsultaComponent } from './components/consulta/insertareditarconsulta/insertareditarconsulta.component';
import { InsertareditaralertaComponent } from './components/alerta/insertareditaralerta/insertareditaralerta.component';
import { InsertareditardenunciaComponent } from './components/denuncia/insertareditardenuncia/insertareditardenuncia.component';

export const routes: Routes = [
  { path: '', component: IndiceComponent },
  { path: 'usuario/listarusuario', component: ListarusuarioComponent },
  { path: 'vehiculo/listarvehiculo', component: ListarvehiculoComponent },
  { path: 'alerta/listaralerta', component: ListaralertaComponent },
  { path: 'comisaria/listarcomisaria', component: ListarcomisariaComponent },
  { path: 'consulta/listarconsulta', component: ListarconsultaComponent },
  { path: 'denuncia/listardenuncia', component: ListardenunciaComponent },
  { path: 'dispositivo-gps/listardispositivogps', component: ListardispositivoGPSComponent },
  { path: 'reclamo/listarreclamo', component: ListarreclamoComponent },
  { path: 'respuesta/listarrespuesta', component: ListarrespuestaComponent },
  { path: 'rol/listarrol', component: ListarrolComponent },
  { path: 'ruta/listarruta', component: ListarrutaComponent },
  { path: 'ubicacion-registro/listarubicacionregistro', component: ListarubicacionregistroComponent },
  { path: 'usuario/insertareditar', component: InsertareditarComponent },
  { path: 'usuario/ediciones/:id', component: InsertareditarComponent },
{ path: 'consultas/insertareditarconsulta', component: InsertareditarconsultaComponent },
{ path: 'consultas/insertareditarconsulta/:id', component: InsertareditarconsultaComponent },
{ path: 'alertas/insertareditaralerta', component: InsertareditaralertaComponent },
{ path: 'alertas/insertareditaralerta/:id', component: InsertareditaralertaComponent },
{ path: 'denuncia/insertareditardenuncia', component: InsertareditardenunciaComponent },
{ path: 'denuncia/insertareditardenuncia/:id', component: InsertareditardenunciaComponent },


  
];