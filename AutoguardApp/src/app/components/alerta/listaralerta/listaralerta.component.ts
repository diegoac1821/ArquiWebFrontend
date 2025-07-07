import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listaralerta',
  standalone: true,

  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './listaralerta.component.html',
  styleUrls: ['./listaralerta.component.css'],
})
export class ListaralertaComponent implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource<Alerta>();
  displayedColumns: string[] = [
    'id',
    'asunto',
    'fecha',
    'descripcion',
    'vehiculo',
    'editar',
    'eliminar',
  ];

  placaFiltro: string = '';
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private alertaService: AlertaService, private router: Router) {}

  ngOnInit(): void {
    this.alertaService.list().subscribe((data) => {
      console.log('Alertas recibidas:', data); 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.alertaService.delete(id).subscribe(() => {
      this.alertaService.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
  filtrarAlertasPorPlaca(): void {
    if (this.placaFiltro.trim() === '') return;

    this.alertaService
      .getAlertasPorPlaca(this.placaFiltro)
      .subscribe((data: Alerta[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }
  irAConsultaPorPeriodo(): void {
    this.router.navigate(['/alertas/consultaalertaporperiodo']);
  }
}
