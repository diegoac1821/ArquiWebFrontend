import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';

@Component({
  selector: 'app-listarvehiculo',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarvehiculo.component.html',
  styleUrls: ['./listarvehiculo.component.css']
})
export class ListarvehiculoComponent implements OnInit {
  dataSource: MatTableDataSource<Vehiculo> = new MatTableDataSource<Vehiculo>();

  displayedColumns: string[] = ['placa', 'color', 'marca', 'modelo', 'usuario', 'editar', 'eliminar'];


  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.vehiculoService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
