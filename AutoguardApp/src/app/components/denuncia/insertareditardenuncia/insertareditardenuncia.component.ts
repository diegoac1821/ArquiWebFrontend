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
import { Denuncia } from '../../../models/denuncia';
import { DenunciaService } from '../../../services/denuncia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comisaria } from '../../../models/comisaria';
import { Vehiculo } from '../../../models/vehiculo';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ComisariaService } from '../../../services/comisaria.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditardenuncia',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,MatSelectModule
  ],
  templateUrl: './insertareditardenuncia.component.html',
  styleUrl: './insertareditardenuncia.component.css',
})
export class InsertareditardenunciaComponent {
  form: FormGroup = new FormGroup({});
  denuncia: Denuncia = new Denuncia();
  id: number = 0;
  edicion: boolean = false;
  comisarias: Comisaria[] = [];
  vehiculos: Vehiculo[] = [];

  constructor(
    private dS: DenunciaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private comisariaService: ComisariaService,
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      motivo: ['', Validators.required],
      estado: ['', Validators.required],
      comisariaId: [null, Validators.required],
      vehiculoId: [null, Validators.required],
    });
     this.listarComisarias();
     this.listarVehiculos();
  }

  listarComisarias() {
  this.comisariaService.list().subscribe(data => {
    this.comisarias = data;
  });
}

listarVehiculos() {
  this.vehiculoService.list().subscribe(data => {
    this.vehiculos = data;
  });
}
  aceptar() {
    if (this.form.valid) {
      this.denuncia.descripcion = this.form.value.descripcion;
      this.denuncia.motivo = this.form.value.motivo;
      this.denuncia.estado = this.form.value.estado;
      this.denuncia.comisaria = new Comisaria();
      this.denuncia.comisaria.id = this.form.value.comisariaId;
      this.denuncia.vehiculo = new Vehiculo();
      this.denuncia.vehiculo.placa = this.form.value.vehiculoId;
    }
    if (this.edicion) {
      this.denuncia.id = this.id;
      this.dS.update(this.denuncia).subscribe(() => {
        this.dS.list().subscribe((data) => this.dS.setList(data));
        this.router.navigate(['/denuncia/listardenuncia']);
      });
    } else {
      this.dS.insert(this.denuncia).subscribe(() => {
        this.dS.list().subscribe((data) => this.dS.setList(data));
        this.router.navigate(['/denuncia/listardenuncia']);
      });
    }
  }
  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          descripcion: new FormControl(data.descripcion),
          motivo: new FormControl(data.motivo),
          estado: new FormControl(data.estado),
          comisariaId: new FormControl(data.comisaria.id),
          vehiculoId: new FormControl(data.vehiculo.placa),
        });
      });
    }
  }

  
}
