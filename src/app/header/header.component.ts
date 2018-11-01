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
    const oneToken = 1000000000;
    const tradingVolumeTokens = this.appComponent.monthlyTradingVolume;
    const tradeVolumeCurrency = this.appComponent.tokenConverter(tradingVolumeTokens * oneToken);

    return tradeVolumeCurrency;
  }
}
