import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public markets = [];
  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit() {
    const marketsSub = this.appComponent.dataService.markets$.subscribe(
      markets => {
        if (markets) {
          this.markets = markets;
        }
      }
    );
    this.subscriptions.push(marketsSub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  public monthlyVolume(volume: number) {
    return this.appComponent.tokenConverter(volume * 1000000000);
  }
  public monthlyAverageWeightedPrice(priceInUSD: number) {
    return this.appComponent.converter(priceInUSD);
  }
}
