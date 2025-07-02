import { Routes } from '@angular/router';
import { InsertarUbicacionComponent } from './components/ubicacion-registro/insertarubicacion/insertarubicacion.component';
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
import { ListarrespuestaComponent } from './components/respuesta/listarrespuesta/listarrespuesta.component';
import { InsertareditarComponent } from './components/usuario/insertareditar/insertareditar.component';
import { InsertareditarconsultaComponent } from './components/consulta/insertareditarconsulta/insertareditarconsulta.component';
import { InsertareditaralertaComponent } from './components/alerta/insertareditaralerta/insertareditaralerta.component';
import { InsertareditardenunciaComponent } from './components/denuncia/insertareditardenuncia/insertareditardenuncia.component';
import { InsertareditarcomisariaComponent } from './components/comisaria/insertareditarcomisaria/insertareditarcomisaria.component';
import { InsertareditarvehiculoComponent } from './components/vehiculo/insertareditarvehiculo/insertareditarvehiculo.component';
import { InsertareditarrespuestaComponent } from './components/respuesta/insertareditarrespuesta/insertareditarrespuesta.component';
import { VerperfilusuarioComponent } from './components/usuario/verperfilusuario/verperfilusuario.component';

import { InsertareditarreclamosComponent } from './components/reclamo/insertareditarreclamos/insertareditarreclamos.component';
import { InsertareditardispositivoGpsComponent } from './components/dispositivo-gps/insertareditardispositivo-gps/insertareditardispositivo-gps.component';

import { InsertareditarubicacionComponent } from './components/ubicacion-registro/insertareditarubicacion/insertareditarubicacion.component';
import { InsertareditarrutaComponent } from './components/ruta/insertareditarruta/insertareditarruta.component';
import { CrearrutamapaComponent } from './components/ruta/crearrutamapa/crearrutamapa.component';

import { ListaralertaComponent } from './components/alerta/listaralerta/listaralerta.component';
import { ReportecantdenunciasComponent } from './components/reportes/reportecantdenuncias/reportecantdenuncias.component';

import { ConsultarutaperiodoComponent } from './components/ruta/consultarutaperiodo/consultarutaperiodo.component';

import { ReportecantconsultasusuarioComponent } from './components/reportes/reportecantconsultasusuario/reportecantconsultasusuario.component';
import { ReportebuscardenunciasporestadoComponent } from './components/reportes/reportebuscardenunciasporestado/reportebuscardenunciasporestado.component';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta pública
  { path: 'login', component: LoginComponent },

  // Todas las rutas protegidas por seguridadGuard
  {
    path: '',
    canActivate: [seguridadGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'alerta/listaralerta', component: ListaralertaComponent },
      {
        path: 'alertas/insertareditaralerta',
        component: InsertareditaralertaComponent,
      },
      {
        path: 'alertas/insertareditaralerta/:id',
        component: InsertareditaralertaComponent,
      },
      {
        path: 'comisaria/listarcomisaria',
        component: ListarcomisariaComponent,
      },
      {
        path: 'comisaria/insertareditarcomisaria',
        component: InsertareditarcomisariaComponent,
      },
      {
        path: 'comisaria/insertareditarcomisaria/:id',
        component: InsertareditarcomisariaComponent,
      },
      { path: 'consulta/listarconsulta', component: ListarconsultaComponent },
      {
        path: 'consultas/insertareditarconsulta',
        component: InsertareditarconsultaComponent,
      },
      {
        path: 'consultas/insertareditarconsulta/:id',
        component: InsertareditarconsultaComponent,
      },
      { path: 'denuncia/listardenuncia', component: ListardenunciaComponent },
      {
        path: 'denuncia/insertareditardenuncia',
        component: InsertareditardenunciaComponent,
      },
      {
        path: 'denuncia/insertareditardenuncia/:id',
        component: InsertareditardenunciaComponent,
      },
      {
        path: 'dispositivo-gps/listardispositivogps',
        component: ListardispositivoGPSComponent,
      },
      {
        path: 'dispositivo-gps/insertareditardispositivo-gps',
        component: InsertareditardispositivoGpsComponent,
      },
      {
        path: 'dispositivo-gps/insertareditardispositivo-gps/:id',
        component: InsertareditardispositivoGpsComponent,
      },
      { path: 'reclamo/listarreclamo', component: ListarreclamoComponent },
      {
        path: 'reclamo/insertareditarreclamos',
        component: InsertareditarreclamosComponent,
      },
      {
        path: 'reclamo/insertareditarreclamo/:id',
        component: InsertareditarreclamosComponent,
      },
      {
        path: 'respuesta/listarrespuesta',
        component: ListarrespuestaComponent,
      },
      {
        path: 'respuestas/listarrespuesta',
        component: ListarrespuestaComponent,
      }, // Duplicado, opcional
      {
        path: 'respuestas/insertareditarrespuesta',
        component: InsertareditarrespuestaComponent,
      },
      {
        path: 'respuestas/insertareditarrespuesta/:id',
        component: InsertareditarrespuestaComponent,
      },
      { path: 'rol/listarrol', component: ListarrolComponent },
      { path: 'ruta/listarruta', component: ListarrutaComponent },
      {
        path: 'ruta/insertareditarruta',
        component: InsertareditarrutaComponent,
      },
      {
        path: 'ruta/insertareditarruta/:id',
        component: InsertareditarrutaComponent,
      },
      { path: 'ruta/crearrutamapa', component: CrearrutamapaComponent },
      {
        path: 'ruta/consultarutaperiodo',
        component: ConsultarutaperiodoComponent,
      },
      {
        path: 'ubicacion/insertarubicacion',
        component: InsertarUbicacionComponent,
      },
      {
        path: 'ubicacion-registro/listarubicacionregistro',
        component: ListarubicacionregistroComponent,
      },
      {
        path: 'ubicacion-registro/insertareditarubicacion-registro',
        component: InsertareditarubicacionComponent,
      },
      {
        path: 'ubicacion-registro/insertareditarubicacion-registro/:id',
        component: InsertareditarubicacionComponent,
      },
      { path: 'usuario/listarusuario', component: ListarusuarioComponent },
      { path: 'usuario/insertareditar', component: InsertareditarComponent },
      { path: 'usuario/ediciones/:id', component: InsertareditarComponent },
      { path: 'usuario/perfil/:id', component: VerperfilusuarioComponent },
      { path: 'vehiculo/listarvehiculo', component: ListarvehiculoComponent },
      {
        path: 'vehiculo/insertareditarvehiculo',
        component: InsertareditarvehiculoComponent,
      },
      {
        path: 'vehiculo/insertareditarvehiculo/:placa',
        component: InsertareditarvehiculoComponent,
      },
      { path: 'homes', component: HomeComponent },
    ],
  },
];
