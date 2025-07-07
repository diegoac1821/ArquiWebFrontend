import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertaService } from '../../../services/alerta.service';
import { Alerta } from '../../../models/alerta';

@Component({
  selector: 'app-consultaalertaporperiodo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
  ],
  templateUrl: './consultaalertaporperiodo.component.html',
  styleUrls: ['./consultaalertaporperiodo.component.css']
})
export class ConsultaalertaporperiodoComponent {
  fecha1!: Date;
  fecha2!: Date;
  dataSource!: MatTableDataSource<Alerta>;
  displayedColumns: string[] = ['id', 'fecha', 'asunto', 'descripcion', 'vehiculo'];

  constructor(private alertaService: AlertaService, private router: Router) {}

  consultarAlertas(): void {
    if (this.fecha1 && this.fecha2) {
      const fechaInicio = this.fecha1.toISOString().split('T')[0];
      const fechaFin = this.fecha2.toISOString().split('T')[0];

      this.alertaService.getAlertasPorPeriodo(fechaInicio, fechaFin).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/alerta/listaralerta']); 
  }
}
