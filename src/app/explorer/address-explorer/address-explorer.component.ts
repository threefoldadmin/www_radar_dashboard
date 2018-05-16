import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-address-explorer',
  templateUrl: './address-explorer.component.html',
  styleUrls: ['../explorer.component.css', './address-explorer.component.css']
})
export class AddressExplorerComponent implements OnInit {
  @Input() public item;
  @Input() public id;

  public paginator = {
    limit: 10,
    current: {
      transactions: 1,
      minerPayouts: 1,
      blockStakeMotion: 1
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
  public tokenConverter(value: number, exchangeRates?: any) {
    return this.appComponent.tokenConverter(value, exchangeRates);
  }
  public symbol(position: string) {
    return this.appComponent.symbol(position);
  }
  public currentCurrencyPair() {
    return this.appComponent.currentCurrencyPair;
  }
  public pageChanged(page: number, name: string) {
    this.paginator.current[name] = page;
    this.appComponent.getPageData('wallet', this.item._id, this.paginator.limit, this.paginator.current[name], name).subscribe(
      data => {
        if (data) {
          this.item[name] = data;
        }
      }
    );
  }
}
