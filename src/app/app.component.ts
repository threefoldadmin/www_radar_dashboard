import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { SocketService } from '../services/socket.service';
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public notifyOptions = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: false,
    pauseOnHover: true,
    preventDuplicates: true,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['right', 'top']
  };

  // Dynamic Stats
  public totalSupply = 0;
  public computeUnitsTotal = 0;
  public storageUnitsTotal = 0;
  public storageUnitsTB = 0; // 73000
  public storageUnitsCores = 0;
  public fiveYearsNetworkRevenue = 0;
  public maxSupply = 0;

  public computeUnitPriceUSD = 0;
  public storageUnitPriceUSD = 0;

  public circulatingSupply = 186046470;
  public monthlyTradingVolume = 0;
  public weightedTokenPriceUSD = 0;
  public tradePairs;

  public exchangeRates;
  public currentCurrencyPair = 'usd';

  constructor(
    public socketService: SocketService,
    public dataService: DataService,
    public notify: NotificationsService,
    public apiService: ApiService,
  ) {
    this.socketService.initSocket();
    this.socketService.onTick().subscribe(
      (data) => {
        this.setMainData(data);
      });
    this.getMainData();
    this.getPeersStatData();
    this.setCurrency('usd');
  }
  public API(...args): Observable<any> {
    return new Observable<any>(observer => {
      this.apiService[args[0]](...args.slice(1)).subscribe(
        res => {
          if (res.result) {
            observer.next(res.data);
          } else {
            this.notify.error('Error', res.message);
          }
        },
        err => {
          this.notify.error('Error', 'Server unavailable');
        },
      );
    });
  }
  public getMainData() {
    this.API('get', '').subscribe(
      data => {
        if (data) {
         this.setMainData(data);
        }
      },
    );
  }
  public setMainData(data: any) {
    this.totalSupply = this.tokens(data.totalSupply);
    // HARDCORE
    // this.weightedTokenPriceUSD = data.currency.tftPrice.monthlyAverageWeightedPrice;
    // this.monthlyTradingVolume = data.currency.tftPrice.monthlyTradingVolume;
    this.monthlyTradingVolume = 1290029.063050;
    this.weightedTokenPriceUSD = 0.0958;

    this.tradePairs = data.currency.tftPrice.pairs;
    this.exchangeRates = data.currency;

    this.dataService.exchangeRates$.next(data.currency);
    this.dataService.lastBlock$.next(data.lastBlock);

    if (data.markets) {
      this.dataService.markets$.next(data.markets);
    }

    if (data.lastBlocks) {
      this.dataService.lastBlocks$.next(data.lastBlocks);
    }
  }
  public getPeersStatData() {
    this.API('get', 'peers/stat').subscribe(
      data => {
        if (data) {
          this.setPeersStatData(data);
        }
      },
    );
  }
  public setPeersStatData(data: any) {
    this.computeUnitsTotal = data.computeUnitsTotal || 0;
    this.storageUnitsTotal = data.storageUnitsTotal || 0;
    this.storageUnitsTB = data.storageUnitsTB || 0;
    this.storageUnitsCores = data.storageUnitsCores || 0;
    this.fiveYearsNetworkRevenue = data.fiveYearsNetworkRevenue || 0;
    this.maxSupply = data.maxSupply || 0;
    this.computeUnitPriceUSD = data.computeUnitPriceUSD || 0;
    this.storageUnitPriceUSD = data.storageUnitPriceUSD || 0;
  }

  public calculateTokenPrice(tradePairs: any, exchangeRates: any): number {
    let price = 0;
    const pairUSD = tradePairs.TFT_USD;
    const pairBTC = tradePairs.TFT_BTC;
    const pairVolumes = tradePairs.TFT_USD.volume + tradePairs.TFT_BTC.volume;

    price = (pairUSD.price * pairUSD.volume + (pairBTC.price * exchangeRates.btcUsd) * pairBTC.volume) / pairVolumes;

    return price;
  }
  public setCurrency(currency: string) {
    this.currentCurrencyPair = currency;
    this.dataService.currency$.next(currency);
  }
  public tokens(value: number) {
    return value / 1000000000;
  }
  public converter(amountInUsd: number, customExchangeRates?: any ) {
    const pair = this.currentCurrencyPair;
    const exchangeRates = customExchangeRates ? customExchangeRates : this.exchangeRates;
    if ( pair === 'usd' ) {
      return amountInUsd;
    }
    if (exchangeRates) {
      return amountInUsd / exchangeRates[pair];
    } else {
      this.setCurrency('usd');
      return amountInUsd;
    }
  }
  public tokenConverter(value: number, exchangeRates?: any ) {
    let result;
    const tokens = this.tokens(value);
    const pair = this.currentCurrencyPair;
    let tokenPriceUSD = this.weightedTokenPriceUSD;
    if (exchangeRates) {
      tokenPriceUSD = this.calculateTokenPrice(exchangeRates.tftPrice.pairs, exchangeRates);
    }

    const tokensInUsd = tokenPriceUSD * tokens;

    if (pair === 'usd') {
      result = tokensInUsd;
    } else {
      result = this.converter(tokensInUsd, exchangeRates);
    }
    return result;
  }
  public getPageData(name: string, id: any, limit: number, page: number, type: string ) {
    const items = new BehaviorSubject<any>([]);
    const path = `${name}/${id}/${type}`;
    const query = {
      skip: limit * (page - 1),
      limit: limit
    };
    this.API('get', path, query).subscribe(
      data => {
        if (data) {
          items.next(data.list);
        }
      },
    );
    return items;
  }
}
