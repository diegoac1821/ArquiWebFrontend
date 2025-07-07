import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Alerta } from '../../../models/alerta';
import { Vehiculo } from '../../../models/vehiculo';
import { AlertaService } from '../../../services/alerta.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditaralerta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './insertareditaralerta.component.html',
  styleUrls: ['./insertareditaralerta.component.css'],
})
export class InsertareditaralertaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  alerta: Alerta = new Alerta();
  id: number = 0;
  edicion: boolean = false;
  vehiculo: Vehiculo[] = [];

  constructor(
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      asunto: ['', Validators.required],
      fecha: [new Date(), Validators.required], 
      descripcion: ['', Validators.required],
      vehiculoId: [null, Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.listarVehiculos();
  }

  listarVehiculos() {
    this.vehiculoService.list().subscribe((data) => {
      this.vehiculo = data;
    });
  }

  init() {
    if (this.edicion) {
      this.alertaService.listId(this.id).subscribe((data) => {
        this.form.setValue({
          asunto: data.asunto,
          fecha: data.fecha,
          descripcion: data.descripcion,
          vehiculoId: data.vehiculo.placa,
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['/alerta/listaralerta']);
  }

  aceptar() {
    if (this.form.valid) {
      this.alerta.asunto = this.form.value.asunto;
      this.alerta.fecha = this.form.value.fecha;
      this.alerta.descripcion = this.form.value.descripcion;
      this.alerta.vehiculo = new Vehiculo();
      this.alerta.vehiculo.placa = this.form.value.vehiculoId;

      if (this.edicion) {
        this.alerta.id = this.id;
        this.alertaService.update(this.alerta).subscribe(() => {
          this.alertaService.list().subscribe((data) => {
            this.alertaService.setList(data);
          });
          alert('Alerta actualizada exitosamente');
          this.router.navigate(['/alerta/listaralerta']);
        });
      } else {
        this.alertaService.insert(this.alerta).subscribe(() => {
          this.alertaService.list().subscribe((data) => {
            this.alertaService.setList(data);
          });
          alert('Alerta registrada exitosamente'); 
          this.router.navigate(['/alerta/listaralerta']);
        });
      }
    } else {
      this.form.markAllAsTouched(); 
    }
  }
}
