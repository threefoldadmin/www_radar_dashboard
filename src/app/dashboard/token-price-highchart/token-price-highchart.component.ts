import { Component, OnInit, Input } from '@angular/core';
import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-token-price-highchart',
  templateUrl: './token-price-highchart.component.html',
  styleUrls: ['./token-price-highchart.component.css']
})
export class TokenPriceHighchartComponent implements OnInit {
  @Input() public data;

  public stock: StockChart;
  public isFullScreenMode = false;
  public chartWrapperWidth;

  constructor() { }

  ngOnInit() {

    this.stock = new StockChart({
      colors: ['#00ffff'],
      rangeSelector: {
        selected: 0,
        // allButtonsEnabled: true,
        buttons: [
        // {
        //   type: 'day',
        //   count: 10,
        //   text: 'Day',
        // },
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
        pointFormat: 'TFT price: {point.y:.8f} BTC',
        style: {
          color: '#fff'
        }
      },
      series: [{
        name: 'Token price',
        data: this.data
      }]
    });
  }
  public fullScreen() {
    this.isFullScreenMode = !this.isFullScreenMode;
    // reflow doesn't work without timeout
    setTimeout(() => { this.stock.ref.reflow(); }, 100);
  }
}
