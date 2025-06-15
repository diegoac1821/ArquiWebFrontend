import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrespuestaComponent } from './listarrespuesta/listarrespuesta.component';

@Component({
  selector: 'app-respuesta',
  imports: [ListarrespuestaComponent, RouterOutlet],
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.css'
})
export class RespuestaComponent {
  constructor(public route: ActivatedRoute) {}  

}
