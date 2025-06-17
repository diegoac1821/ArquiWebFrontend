import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ubicacion_registro } from '../../../models/ubicacion_registro';
import { UbicacionRegistroService } from '../../../services/ubicacion-registro.service';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-listarubicacionregistro',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './listarubicacion-registro.component.html',
  styleUrls: ['./listarubicacion-registro.component.css']
})
export class ListarubicacionregistroComponent implements OnInit {
  dataSource: MatTableDataSource<ubicacion_registro> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'latitud', 'longitud', 'fecha', 'hora', 'gps'];

  constructor(private ubicacionService: UbicacionRegistroService) {}

  ngOnInit(): void {
    this.ubicacionService.list().subscribe((data) => {
      console.log('Ubicaciones:', data);
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
