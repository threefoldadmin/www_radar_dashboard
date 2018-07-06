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
  // Static Stats
  public computeUnitsTotal = 25200;
  public storageUnitsTotal = 91578;
  public storageUnitsTB = 73000;
  public storageUnitsCores = 28000;
  public computeUnitPriceUSD = 12;
  public storageUnitPriceUSD = 10;
  public maxSupply = 100000000000;

  // Dynamic Stats
  public totalSupply;

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
        this.setData(data);
      });
    this.getData();
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
  public getData() {
    this.API('get', '').subscribe(
      data => {
        if (data) {
         this.setData(data);
        }
      },
    );
  }
  public setData(data: any) {
    this.totalSupply = this.tokens(data.totalSupply);
    this.weightedTokenPriceUSD = data.currency.tftPrice.weightedAveragePrice;
    this.tradePairs = data.currency.tftPrice.pairs;
    this.exchangeRates = data.currency;

    this.dataService.exchangeRates$.next(data.currency);
    this.dataService.lastBlock$.next(data.lastBlock);
    if (data.lastBlocks) {
      this.dataService.lastBlocks$.next(data.lastBlocks);
    }
    // if (data.TFT_BTC) {
    //   this.dataService.tokenPriceBTCAlphaHistory$.next(data.TFT_BTC);
    // }
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
