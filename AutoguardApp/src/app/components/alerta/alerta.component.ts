import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaralertaComponent } from './listaralerta/listaralerta.component';

@Component({
  selector: 'app-alerta',
  imports: [ListaralertaComponent,RouterOutlet],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {
  constructor(public route: ActivatedRoute) {}
  
}
