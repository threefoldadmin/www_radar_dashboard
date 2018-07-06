import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as d3 from 'd3-shape';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-token-price-chart',
  templateUrl: './token-price-chart.component.html',
  styleUrls: ['./token-price-chart.component.css', '../dashboard.component.css']
})
export class TokenPriceChartComponent implements OnInit, OnDestroy {
  @Input() public data = [];

  private subscriptions: Subscription[] = [];
  public chartData;

  public chartOptions = {
    colorScheme: {
      domain: ['#17f9be']
    },
    gradient: true,
    xAxis: true,
    yAxis: true,
    legend: true,
    legendTitle: '',
    showXAxisLabel: false,
    showYAxisLabel: false,
    autoScale: false,
    curve: d3.curveLinear,
  };

  constructor(
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    const currencySub = this.appComponent.dataService.currency$.subscribe(
      curr => {
        if (curr) {
          this.initChart();
        }
      }
    );
    this.subscriptions.push(currencySub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  private initChart() {
    const series = this.data.map(el => {
      const price = {
        name: el.name,
        value: this.appComponent.converter(el.value)
      };
      return price;
    });
    this.chartData = [
      {
        'name': 'Token price',
        'series': series
      }
    ];
  }
}
