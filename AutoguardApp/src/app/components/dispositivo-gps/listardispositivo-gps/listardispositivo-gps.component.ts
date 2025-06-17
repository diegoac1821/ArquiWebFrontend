import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Dispositivo_GPS } from '../../../models/dispositivo_GPS';
import { DispositivoGPSService } from '../../../services/dispositivo-gps.service';

@Component({
  selector: 'app-listardispositivo-gps',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listardispositivo-gps.component.html',
  styleUrl: './listardispositivo-gps.component.css'
})
export class ListardispositivoGPSComponent implements OnInit{
  dataSource: MatTableDataSource<Dispositivo_GPS> = new MatTableDataSource<Dispositivo_GPS>();

  displayedColumns: string[] = ['id', 'numeroSerie', 'precio', 'fechaAdquisicion', 'vehiculo'];

  constructor(private dgpS: DispositivoGPSService) {}

  ngOnInit(): void {
    this.dgpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}


