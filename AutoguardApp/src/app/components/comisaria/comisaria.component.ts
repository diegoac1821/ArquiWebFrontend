import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomisariaComponent } from './listarcomisaria/listarcomisaria.component';

@Component({
  selector: 'app-comisaria',
  imports: [ListarcomisariaComponent, RouterOutlet],
  templateUrl: './comisaria.component.html',
  styleUrl: './comisaria.component.css'
})
export class ComisariaComponent {
    constructor(public route: ActivatedRoute) {}

}
