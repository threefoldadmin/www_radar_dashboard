import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { Subscription } from 'rxjs';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-token-price-highchart',
  templateUrl: './token-price-highchart.component.html',
  styleUrls: ['./token-price-highchart.component.css']
})
export class TokenPriceHighchartComponent implements OnInit, OnDestroy {
  @Input() public data;

  private subscriptions: Subscription[] = [];
  private btcUsdRate = 0;

  public stock: StockChart;
  public isFullScreenMode = false;

  constructor(
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.initChart();
    const exchangeRatesSub = this.appComponent.dataService.exchangeRates$.subscribe(
      rates => {
        if (rates) {
          const btcUsdRate = rates.btcUsd;
          if (!this.btcUsdRate) {
            this.btcUsdRate = btcUsdRate;
            this.initChart();
          }
        }
      }
    );
    this.subscriptions.push(exchangeRatesSub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  private initChart() {
    const dataUSD = this.data.map(el => {
      const timestamp = el[0];
      const priceBTC = el[1];
      const priceUSD = this.btcUsdRate * priceBTC;
      const formattedPrice = Number(priceUSD.toFixed(4));
      return [timestamp, formattedPrice];
    });

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
        data: dataUSD,
        color: '#17f9be'
      }, {
        name: 'TFT/BTC',
        yAxis: 1,
        data: this.data,
        color: '#00ffff',
        stack: 'effectif'
      }]
    });
  }
  public fullScreen() {
    this.isFullScreenMode = !this.isFullScreenMode;
    // reflow doesn't work without timeout
    setTimeout(() => { this.stock.ref.reflow(); }, 100);
  }
}
