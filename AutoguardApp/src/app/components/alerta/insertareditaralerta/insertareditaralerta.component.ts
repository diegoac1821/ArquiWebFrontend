import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Alerta } from '../../../models/alerta';
import { Vehiculo } from '../../../models/vehiculo';
import { AlertaService } from '../../../services/alerta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditaralerta',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,MatOptionModule,MatSelectModule
  ],
  templateUrl: './insertareditaralerta.component.html',
  styleUrl: './insertareditaralerta.component.css',
})
export class InsertareditaralertaComponent {
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
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      asunto: ['', Validators.required],
      fecha: [new Date(), Validators.required],
      descripcion: ['', Validators.required],
      vehiculoId: [null, Validators.required],
    });

    this.listarVehiculos();
  }

  listarVehiculos() {
    this.vehiculoService.list().subscribe((data) => {
      this.vehiculo = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.alerta.asunto = this.form.value.asunto;
      this.alerta.fecha = this.form.value.fecha;
      this.alerta.descripcion = this.form.value.descripcion;
      this.alerta.v = new Vehiculo();
      this.alerta.v.placa = this.form.value.vehiculoId;

      if (this.edicion) {
        this.alerta.id = this.id;
        this.alertaService.update(this.alerta).subscribe(() => {
          this.alertaService.list().subscribe((data) => {
            this.alertaService.setList(data);
          });
          this.router.navigate(['/alertas/listaralerta']);
        });
      } else {
        this.alertaService.insert(this.alerta).subscribe(() => {
          this.alertaService.list().subscribe((data) => {
            this.alertaService.setList(data);
          });
          this.router.navigate(['/alertas/listaralerta']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.alertaService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          asunto: new FormControl(data.asunto),
          fecha: new FormControl(data.fecha),
          descripcion: new FormControl(data.descripcion),
          vehiculoId: new FormControl(data.v.placa),
        });
      });
    }
  }
}
