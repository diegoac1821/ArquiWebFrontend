import { Component } from '@angular/core';
import { ListardenunciaComponent } from './listardenuncia/listardenuncia.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-denuncia',
  imports: [ListardenunciaComponent,RouterOutlet],
  templateUrl: './denuncia.component.html',
  styleUrl: './denuncia.component.css'
})
export class DenunciaComponent {
  constructor(public route: ActivatedRoute) {}  

}