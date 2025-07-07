import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ComisariaService } from '../../../services/comisaria.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reportecantdenuncias',
  imports: [BaseChartDirective],
  templateUrl: './reportecantdenuncias.component.html',
  styleUrls: ['./reportecantdenuncias.component.css']
})
export class ReportecantdenunciasComponent implements OnInit {
  barChartType: ChartType = 'bar';
  barChartLegend = true;


  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Denuncias',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Comisarías',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 13,
            family: 'Akshar',
          },
        },
      },
      title: {
        display: true,
        text: 'Cantidad de Denuncias por Comisaría',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Akshar',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  constructor(private cS: ComisariaService) {}

  asignarColor(): string[] {
    return [
      '#5BC0E4',
      '#472F64', 
      '#27193E', 
    ];
  }

  ngOnInit(): void {
    this.cS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre);  

      const coloresFijos = this.asignarColor();

      this.barChartData = [
        {
          data: data.map((item) => item.denunciasporcomisaria),
          label: 'Cantidad de Denuncias',
          backgroundColor: coloresFijos,  
          borderColor: '#27193E', 
          borderWidth: 1,
        },
      ];


      if (this.chart) {
        this.chart.update(); 
      }
    });
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
}



