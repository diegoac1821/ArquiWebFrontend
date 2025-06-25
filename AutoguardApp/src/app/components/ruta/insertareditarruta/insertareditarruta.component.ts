import { Component,OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { Vehiculo } from '../../../models/vehiculo';


@Component({
  selector: 'app-insertareditarruta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './insertareditarruta.component.html',
  styleUrl: './insertareditarruta.component.css'
})
export class InsertareditarrutaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ruta: Ruta = new Ruta();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: RutaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      origenLatitud: ['', Validators.required],
      origenLongitud: ['', Validators.required],
      destinoLatitud: ['', Validators.required],
      destinoLongitud: ['', Validators.required],
      fecha: ['', Validators.required],
      duracion: ['', Validators.required],
      distancia: ['', Validators.required],
      placa: [null, Validators.required]
    });
   
  }

  aceptar() {
    if (this.form.valid) {
      this.ruta.origenLatitud = this.form.value.origenLatitud;
      this.ruta.origenLongitud = this.form.value.origenLongitud;
      this.ruta.destinoLatitud = this.form.value.destinoLatitud;
      this.ruta.destinoLongitud = this.form.value.destinoLongitud;
      this.ruta.fecha = this.form.value.fecha;
      this.ruta.duracion = this.form.value.duracion;
      this.ruta.distancia = this.form.value.distancia;
      this.ruta.vehiculo = new Vehiculo();
      this.ruta.vehiculo.placa = this.form.value.vehiculo;

      if (this.edicion) {
        this.ruta.id = this.id;
        this.rS.update(this.ruta).subscribe(() => {
          this.rS.list().subscribe(data => this.rS.setList(data));
          this.router.navigate(['/ruta/listarruta']);
        });
      } else {
        this.rS.insert(this.ruta).subscribe(() => {
          this.rS.list().subscribe(data => this.rS.setList(data));
          this.router.navigate(['/ruta/listarruta']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          origenLatitud: new FormControl(data.origenLatitud),
          origenLongitud: new FormControl(data.origenLongitud),
          destinoLatitud: new FormControl(data.destinoLatitud),
          destinoLongitud: new FormControl(data.destinoLongitud),
          fecha: new FormControl(new Date(data.fecha)),
          duracion: new FormControl(data.duracion),
          distancia: new FormControl(data.distancia),
          vehiculo: new FormControl(data.vehiculo.placa)
        });
      });
    }
  }
}


