import { Component, OnInit } from '@angular/core';
import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-token-price-highchart',
  templateUrl: './token-price-highchart.component.html',
  styleUrls: ['./token-price-highchart.component.css']
})
export class TokenPriceHighchartComponent implements OnInit {
  public stock: StockChart;
  public isFullScreenMode = false;
  public chartWrapperWidth;

  constructor() { }

  ngOnInit() {

    // tooltip: {
    //   //   valueDecimals: 2
    // },

    this.stock = new StockChart({
      colors: ['#00ffff'],
      rangeSelector: {
        selected: 0,
        allButtonsEnabled: true,
        buttons: [{
          type: 'day',
          count: 10,
          text: 'Day',
        }, {
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
        valueDecimals: 2,
        style: {
          color: '#fff'
        }
      },
      series: [{
        name: 'Token price',
        data: [
          /* Feb 2017 */
          [1485907200000, 128.75],
          [1485993600000, 128.53],
          [1486080000000, 129.08],
          [1486339200000, 130.29],
          [1486425600000, 131.53],
          [1486512000000, 132.04],
          [1487808000000, 136.53],
          [1487894400000, 136.66],
          [1488153600000, 136.93],
          [1488240000000, 136.99],
          /* Mar 2017 */
          [1488326400000, 139.79],
          [1488412800000, 138.96],
          [1488499200000, 139.78],
          [1488758400000, 139.34],
          [1488844800000, 139.52],
          [1488931200000, 139.00],
          [1489017600000, 138.68],
          [1489104000000, 139.14],
          [1489363200000, 139.20],
          [1489449600000, 138.99],
          [1489536000000, 140.46],
          [1489622400000, 140.69],
          [1489708800000, 139.99],
          [1489968000000, 141.46],
          [1490054400000, 139.84],
          [1490140800000, 141.42],
          [1490227200000, 140.92],
          [1490313600000, 140.64],
          [1490572800000, 140.88],
          [1490659200000, 143.80],
          [1490745600000, 144.12],
          [1490832000000, 143.93],
          [1490918400000, 143.66],
          /* Apr 2017 */
          [1491177600000, 143.70],
          [1491264000000, 144.77],
          [1491350400000, 144.02],
          [1491436800000, 143.66],
          [1491523200000, 143.34],
          [1491782400000, 143.17],
          [1491868800000, 141.63],
          [1491955200000, 141.80],
          [1492041600000, 141.05],
          [1492387200000, 141.83],
          [1492473600000, 141.20],
          [1492560000000, 140.68],
          [1492646400000, 142.44],
          [1492732800000, 142.27],
          [1492992000000, 143.64],
          [1493078400000, 144.53],
          [1493164800000, 143.68],
          [1493251200000, 143.79],
          [1493267600000, 163.65],
          [1493277600000, 173.65],
          [1493287600000, 183.65],
          [1493297600000, 143.65],
          [1493337600000, 143.65]
        ]
      }]
    });
  }
  public fullScreen() {
    this.isFullScreenMode = !this.isFullScreenMode;
    // reflow doesn't work without timeout
    setTimeout(() => { this.stock.ref.reflow(); }, 100);
  }
}