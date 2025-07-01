import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RutaService } from '../../../services/ruta.service';
import { RutasperiodoplacaDTO } from '../../../models/RutasperiodoplacaDTO';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-consultarutaperiodo',
  templateUrl: './consultarutaperiodo.component.html',
  styleUrls: ['./consultarutaperiodo.component.css'],
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  FormsModule // Necesario para [(ngModel)]
],
  standalone: true
})
export class ConsultarutaperiodoComponent {
  fecha1!: Date;
  fecha2!: Date;
  placa: string = '';
  dataSource!: MatTableDataSource<RutasperiodoplacaDTO>;
  displayedColumns: string[] = ['id', 'fecha', 'placa', 'distancia', 'duracion'];

  constructor(private rutaService: RutaService) {}

  consultarRutas(): void {
    const params = {
      fecha1: this.fecha1.toISOString().split('T')[0],
      fecha2: this.fecha2.toISOString().split('T')[0],
      placa: this.placa
    };

    this.rutaService.getRutasPeriodoPlaca(params).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
