import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarreclamoComponent } from "./listarreclamo/listarreclamo.component";

@Component({
  selector: 'app-reclamo',
  imports: [ListarreclamoComponent, RouterOutlet],
  templateUrl: './reclamo.component.html',
  styleUrl: './reclamo.component.css'
})
export class ReclamoComponent {
  constructor(public route: ActivatedRoute) {}  
}
