import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardispositivoGPSComponent } from './listardispositivo-gps/listardispositivo-gps.component';

@Component({
  selector: 'app-dispositivo-gps',
  imports: [ListardispositivoGPSComponent,RouterOutlet],
  templateUrl: './dispositivo-gps.component.html',
  styleUrl: './dispositivo-gps.component.css'
})
export class DispositivoGPSComponent {
  constructor(public route: ActivatedRoute) {}  

}
