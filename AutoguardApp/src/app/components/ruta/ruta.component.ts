import { Component } from '@angular/core';
import { ListarrutaComponent } from "./listarruta/listarruta.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-ruta',
  imports: [ListarrutaComponent,RouterOutlet],
  templateUrl: './ruta.component.html',
  styleUrl: './ruta.component.css'
})
export class RutaComponent {
  constructor(public route: ActivatedRoute) {}  

}
