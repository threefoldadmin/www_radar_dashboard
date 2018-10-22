import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public query;
  public currencies = {
    pairs: ['usd', 'usdEur', 'btcUsd'],
    names: {
      usd: 'USD',
      usdEur: 'EUR',
      btcUsd: 'BTC'
    },
    current: ''
  };
  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    const currencySub = this.appComponent.dataService.currency$.subscribe(
      current => {
        if (current) {
          this.currencies.current = current;
        }
      }
    );
    this.subscriptions.push(currencySub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  public search() {
    if (!this.query) {
      return;
    }
    this.router.navigate([`/search/${this.query}`]);
  }
  public setCurrency(currency: string) {
    this.appComponent.setCurrency(currency);
  }
  public tokenPrice() {
    const oneToken = 1000000000;
    return this.appComponent.tokenConverter(oneToken);
  }
  public tradeVolume() {
    let tradeVolume = 0;
    const rates = {
      btcUsd: 6469.10944957,
      usdEur: 1.147
    };
    const tradeVolumeUSD = 123600.30;
    const pair = this.appComponent.currentCurrencyPair;
    if (pair === 'usd') {
      tradeVolume = tradeVolumeUSD;
    } else if (pair === 'btcUsd') {
      tradeVolume = tradeVolumeUSD / rates.btcUsd;
    } else {
      tradeVolume = tradeVolumeUSD / rates.usdEur;
    }
    //  if (monthlyTradingVolume) {
    //   console.log(monthlyTradingVolume);
    //   tradeVolume = this.appComponent.tokenConverter(monthlyTradingVolume * 1000000000);
    // }
    return tradeVolume;
  }
}
