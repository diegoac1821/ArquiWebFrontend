import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { Vehiculo } from '../../../models/vehiculo';


@Component({
  selector: 'app-insertareditarruta',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './insertareditarruta.component.html',
  styleUrl: './insertareditarruta.component.css'
})
export class InsertareditarrutaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
    ruta: Ruta = new Ruta();
    id: number = 0;
    edicion: boolean = false;
  
    constructor(
      private rutaService: RutaService,
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
        id: [''],
        origenLatitud: ['', Validators.required],
        origenLongitud: ['', Validators.required],
        destinoLatitud: ['', Validators.required],
        destinoLongitud: ['', Validators.required],
        fecha: ['', Validators.required],
        duracion: ['', Validators.required],
        distancia: ['', Validators.required],
        placav: [null, Validators.required],
      });
    }
  
    aceptar() {
      if (this.form.valid) {
        this.ruta.id = this.form.value.id;
        this.ruta.origenLatitud = this.form.value.origenLatitud;
        this.ruta.origenLongitud = this.form.value.origenLongitud;
        this.ruta.destinoLatitud = this.form.value.destinoLatitud;
        this.ruta.destinoLongitud = this.form.value.destinoLongitud;
        this.ruta.fecha = this.form.value.fecha;
        this.ruta.duracion = this.form.value.duracion;
        this.ruta.distancia = this.form.value.distancia;
        this.ruta.vehiculo = new Vehiculo();
        this.ruta.vehiculo.placa = this.form.value.placav;


  
        if (this.edicion) {
          this.ruta.id = this.id;
          this.rutaService.update(this.ruta).subscribe(() => {
            this.rutaService.list().subscribe((data) => this.rutaService.setList(data));
            this.router.navigate(['/ruta/listarruta']);
          });
        } else {
          this.rutaService.insert(this.ruta).subscribe(() => {
            this.rutaService.list().subscribe((data) => this.rutaService.setList(data));
            this.router.navigate(['/ruta/listarruta']);
          });
        }
      }
    }
  
    init() {
      if (this.edicion) {
        this.rutaService.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            id: new FormControl(data.id, Validators.required),
            origenLatitud: new FormControl(data.origenLatitud, Validators.required),
            origenLongitud: new FormControl(data.origenLongitud, Validators.required),
            destinoLatitud: new FormControl(data.destinoLatitud, Validators.required),
            destinoLongitud: new FormControl(data.destinoLongitud, Validators.required),
            fecha: new FormControl(data.fecha, Validators.required),
            duracion: new FormControl(data.duracion, Validators.required),
            distancia: new FormControl(data.distancia, Validators.required),
            placav: new FormControl(data.vehiculo.placa, Validators.required),
          });
        });
      }
    }
}
