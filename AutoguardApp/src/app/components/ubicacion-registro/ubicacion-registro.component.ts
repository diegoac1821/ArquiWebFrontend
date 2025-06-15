import { Component } from '@angular/core';
import { ListarubicacionregistroComponent } from "./listarubicacion-registro/listarubicacion-registro.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-ubicacion-registro',
  imports: [ListarubicacionregistroComponent, RouterOutlet],
  templateUrl: './ubicacion-registro.component.html',
  styleUrl: './ubicacion-registro.component.css'
})
export class UbicacionRegistroComponent {
  constructor(public route: ActivatedRoute) {}  

}
