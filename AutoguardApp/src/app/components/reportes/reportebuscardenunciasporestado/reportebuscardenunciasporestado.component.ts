import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Denuncia } from '../../../models/denuncia';
import { DenunciaService } from '../../../services/denuncia.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportebuscardenunciasporestado',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reportebuscardenunciasporestado.component.html',
  styleUrl: './reportebuscardenunciasporestado.component.css'
})
export class ReportebuscardenunciasporestadoComponent implements OnInit {
  dataSource: MatTableDataSource<Denuncia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  form: FormGroup;
  tipoBusqueda: string = '';
  todasLasDenuncias: Denuncia[] = []; 

  constructor(private denS: DenunciaService, private fb: FormBuilder) {
    this.form = fb.group({
      cajita: [''],
    });
  }

  ngOnInit(): void {
    this.denS.list().subscribe((data) => {
      this.todasLasDenuncias = data;
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('cajita')?.valueChanges.subscribe((value) => {
      this.tipoBusqueda = value;
      this.buscar();
    });
  }

  buscar(): void {
    const estado = this.tipoBusqueda.trim().toLowerCase();

    if (estado) {
      const filtrado = this.todasLasDenuncias.filter(d =>
        d.estado.toLowerCase().includes(estado)
      );
      this.dataSource = new MatTableDataSource(filtrado);
    } else {
      this.dataSource = new MatTableDataSource(this.todasLasDenuncias);
    }
  }
}
