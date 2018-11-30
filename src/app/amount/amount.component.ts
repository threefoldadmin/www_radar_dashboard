import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.css']
})
export class AmountComponent implements OnInit {
  @Input() public amount;
  @Input() public decimalMax = 2;
  @Input() public decimalMin = 2;
  @Input() public fixedDecimal = false;
  @Input() public tooltip = false;

  constructor(
    private appComponent: AppComponent,
  ) { }

  ngOnInit() {
  }
  public decimal() {
    let decimalMin = this.decimalMin;
    let decimalMax = this.decimalMax;
    if (this.currentCurrencyPair() === 'btcUsd') {
      decimalMax = 8;
    }
    if (this.fixedDecimal) {
      decimalMin = 0;
      decimalMax = 0;
    }
    return `1.${decimalMin}-${decimalMax}`;
  }

  public symbol(position: string) {
    let result = '';
    if (position === 'l') {
      if (this.currentCurrencyPair() === 'usd') {
        result = '$';
      } else if (this.currentCurrencyPair() === 'usdEur') {
        result = '€';
      }
    }
    if (position === 'r') {
      if (this.currentCurrencyPair() === 'btcUsd') {
        result = 'Ƀ';
      }
    }
    return result;
  }
  public currentCurrencyPair() {
    return this.appComponent.currentCurrencyPair;
  }
}
