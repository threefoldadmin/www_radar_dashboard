import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-transaction-explorer',
  templateUrl: './transaction-explorer.component.html',
  styleUrls: ['../explorer.component.css', './transaction-explorer.component.css']
})
export class TransactionExplorerComponent implements OnInit {
  @Input() public item;
  @Input() public id;

  public paginator = {
    limit: 10,
    current: {
      coinOutputs: 1,
      blockStakeOutputs: 1
    }
  };

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
  public pageChanged(page: number, name: string) {
    this.paginator.current[name] = page;
    this.appComponent.getPageData('transaction', this.item._id, this.paginator.limit, this.paginator.current[name], name).subscribe(
      data => {
        if (data) {
          this.item[name] = data;
        }
      }
    );
  }
}
