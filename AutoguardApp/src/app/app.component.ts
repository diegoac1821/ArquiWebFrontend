import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 Necesario para router-outlet

@Component({
  selector: 'app-root',
  standalone: true, // 👈 Obligatorio para standalone
  imports: [RouterModule], // 👈 Para que funcione <router-outlet>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // 👈 'styleUrls' en plural
})
export class AppComponent {
  title = 'AutoguardApp';
}
