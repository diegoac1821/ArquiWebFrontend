import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AlertaService } from '../../../services/alerta.service';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';

@Component({
  selector: 'app-reporteusuariomasalerta',
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [BaseChartDirective],
  templateUrl: './reporteusuariomasalerta.component.html',
  styleUrl: './reporteusuariomasalerta.component.css',
})
export class ReporteusuariomasalertaComponent implements OnInit {
  barCharType: ChartType = 'bar';
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
          text: 'Total de Alertas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Usuarios',
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
        text: 'Usuarios con mayor número de alertas',
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

  constructor(private aS: AlertaService) {}

  ngOnInit(): void {
    this.aS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreCompleto);
      this.barChartData = [
        {
          data: data.map((item) => item.totalAlertas),
          label: 'Cantidad de Alertas',
          backgroundColor: [
            '#5BC0E4', 
            '#472F64', 
            '#27193E',
          ],
          borderColor: '#333',
          borderWidth: 1,
        },
      ];
    });
  }
}
