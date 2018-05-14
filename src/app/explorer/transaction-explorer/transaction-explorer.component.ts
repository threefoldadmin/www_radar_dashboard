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
  public paginator = {
    limit: 10,
    current: {
      coinOutputs: 1
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
    this.getMore(name);
  }
  public getMore(name: string) {
    const path = `transaction/${this.item._id}/more`;
    const query = {
      skip: this.paginator.limit * ( this.paginator.current[name] - 1),
      limit: this.paginator.limit,
      field: name
    };
    this.appComponent.API('get', path, '', query).subscribe(
      data => {
        if (data) {
          this.item[name] = data;
        }
      },
    );
  }
}
