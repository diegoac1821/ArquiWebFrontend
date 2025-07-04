import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot.component'; // Ajusta el path si está en otra carpeta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ChatbotComponent // Importar el componente del chatbot
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
