import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarvehiculoComponent } from './listarvehiculo/listarvehiculo.component';

@Component({
  selector: 'app-vehiculo',
  imports: [RouterOutlet, ListarvehiculoComponent],
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent {
  constructor(public route: ActivatedRoute) {}  

}
