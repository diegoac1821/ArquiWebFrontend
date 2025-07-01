import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ComisariaService } from '../../../services/comisaria.service';
import { Chart, registerables } from 'chart.js';  // Añadido

Chart.register(...registerables);

@Component({
  selector: 'app-reportecantdenuncias',
  imports: [BaseChartDirective],
  templateUrl: './reportecantdenuncias.component.html',
  styleUrls: ['./reportecantdenuncias.component.css']
})
export class ReportecantdenunciasComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';  // Si prefieres gráfico de barras, cambia a 'bar'
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: ComisariaService) {}

  // Función para generar un color hexadecimal aleatorio
  generarColorAleatorio(): string {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnInit(): void {
    this.cS.getQuantity().subscribe(data => {
      this.barChartLabels = data.map(item => item.nombre);  

      // Crear un arreglo de colores aleatorios con la misma longitud que los datos
      const coloresAleatorios = data.map(() => this.generarColorAleatorio());

      this.barChartData = [{
        data: data.map(item => item.denunciasporcomisaria),
        label: 'Cantidad de denuncias',
        backgroundColor: coloresAleatorios,  // Asignar los colores aleatorios
        borderColor: '#d13f20',
        borderWidth: 1
      }];

      // Forzar la actualización del gráfico (si es necesario)
      if (this.chart) {
        this.chart.update(); // Si usas BaseChartDirective, esto forzará la actualización
      }
    });
  }

  // Variable para acceder al gráfico y forzar la actualización
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
}