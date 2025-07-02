import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { MenuComponent } from './components/menu/menu.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tittle = 'AutoguardApp';
  
}
