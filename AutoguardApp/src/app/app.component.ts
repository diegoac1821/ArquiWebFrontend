import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router'; // 👈 Necesario para router-outlet
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import{MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-root',
  standalone: true, // 👈 Obligatorio para standalone
  imports: [RouterModule,   MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,], // 👈 Para que funcione <router-outlet>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // 👈 'styleUrls' en plural
})
export class AppComponent {
  title = 'AutoguardApp';
}