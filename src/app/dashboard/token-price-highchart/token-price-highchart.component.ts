import { Component, OnInit, Input } from '@angular/core';
import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-token-price-highchart',
  templateUrl: './token-price-highchart.component.html',
  styleUrls: ['./token-price-highchart.component.css']
})
export class TokenPriceHighchartComponent implements OnInit {
  @Input() public TFT_BTC;
  @Input() public TFT_USD;

  public stock: StockChart;
  public isFullScreenMode = false;

  constructor(
  ) { }

  ngOnInit() {
    this.initChart();
  }
  private initChart() {
    this.stock = new StockChart({
      rangeSelector: {
        selected: 0,
        buttons: [{
          type: 'day',
          count: 1,
          text: 'Day'
        },
        {
          type: 'week',
          count: 1,
          text: 'Week',
        }, {
          type: 'month',
          count: 1,
          text: 'Month'
        }, {
          type: 'all',
          text: 'All'
        }],
        buttonTheme: {
          width: 60
        },
      },
      tooltip: {
        shared: true,
        // pointFormat: 'TFT price: {point.y:.8f}',
        style: {
          color: '#fff'
        }
      },
      yAxis: [{
        offset: 40,
        labels: {
          format: '${value}',
        },
        title: {
          // text: 'TFT price (USD)',
          style: {
            color: '#fff'
          }
        },
        opposite: true
      }, {
        gridLineWidth: 0,
        labels: {
          format: '{value} BTC',
        },
        title: {
          // text: 'TFT price (BTC)',
          style: {
            color: '#fff'
          }
        }
      }],
      series: [{
        name: 'TFT/USD',
        yAxis: 0,
        data: this.TFT_USD,
        color: '#e797f5'
      }, {
        name: 'TFT/BTC',
        yAxis: 1,
        data: this.TFT_BTC,
        color: '#00ffff'
      }]
    });
  }
  public fullScreen() {
    this.isFullScreenMode = !this.isFullScreenMode;
    // reflow doesn't work without timeout
    setTimeout(() => { this.stock.ref.reflow(); }, 100);
  }
}
