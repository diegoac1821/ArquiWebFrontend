import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarconsultaComponent } from './listarconsulta/listarconsulta.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  imports: [ListarconsultaComponent, RouterOutlet]
})
export class ConsultaComponent {
  constructor(public route: ActivatedRoute) {}
}


