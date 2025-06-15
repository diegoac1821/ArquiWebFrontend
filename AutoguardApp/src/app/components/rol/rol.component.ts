import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrolComponent } from "./listarrol/listarrol.component";

@Component({
  selector: 'app-rol',
  imports: [ListarrolComponent, RouterOutlet],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
  constructor(public route: ActivatedRoute) {}  
}
