import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../app.component';
import { ExplorerComponent } from '../explorer.component';

@Component({
  selector: 'app-address-explorer',
  templateUrl: './address-explorer.component.html',
  styleUrls: ['../explorer.component.css', './address-explorer.component.css']
})
export class AddressExplorerComponent extends ExplorerComponent implements OnInit {
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
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public appComponent: AppComponent,
  ) {
    super(router, activatedRoute, appComponent);
  }

  ngOnInit() {
  }
  public tokenConverter(value: number, exchangeRates?: any) {
    return this.appComponent.tokenConverter(value, exchangeRates);
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
