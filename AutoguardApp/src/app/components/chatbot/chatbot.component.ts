// chatbot.component.ts
import { Component } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
   imports: [
    CommonModule,    
    FormsModule      
  ],
})
export class ChatbotComponent {
  isOpen = false;
  mensaje: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

  constructor(private consultaService: ConsultaService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  enviarMensaje() {
    if (!this.mensaje.trim()) return;

    const mensajeUsuario = this.mensaje;
    this.messages.push({ text: mensajeUsuario, sender: 'user' });
    this.mensaje = '';

    this.consultaService.chatbotResponder(mensajeUsuario).subscribe({
      next: (response) => {
        const respuestaTexto =
          response.candidates?.[0]?.content?.parts?.[0]?.text ||
          'No se encontró una respuesta.';
        this.messages.push({ text: respuestaTexto, sender: 'bot' });
      },
      error: (err) => {
        this.messages.push({ text: '❌ Error al conectar con el chatbot.', sender: 'bot' });
        console.error(err);
      },
    });
  }
}
