import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot.component'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ChatbotComponent 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
