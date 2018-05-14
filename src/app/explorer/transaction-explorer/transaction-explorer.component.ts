import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-transaction-explorer',
  templateUrl: './transaction-explorer.component.html',
  styleUrls: ['../explorer.component.css', './transaction-explorer.component.css']
})
export class TransactionExplorerComponent implements OnInit {
  @Input() public item;
  @Input() public id;
  constructor(
    private router: Router,
    private appComponent: AppComponent,
  ) { }

  ngOnInit() {
  }
  public newSearch(id) {
    this.router.navigate([`/search/${id}`]);
  }
  public tokens(value) {
    return this.appComponent.tokens(value);
  }
  public tokenConverter(value: number) {
    return this.appComponent.tokenConverter(value, this.item.rates);
  }
  public symbol(position: string) {
    return this.appComponent.symbol(position);
  }
  public currentCurrencyPair() {
    return this.appComponent.currentCurrencyPair;
  }

}
