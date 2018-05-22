import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../app.component';
import { ExplorerComponent } from '../explorer.component';

@Component({
  selector: 'app-transaction-explorer',
  templateUrl: './transaction-explorer.component.html',
  styleUrls: ['../explorer.component.css', './transaction-explorer.component.css']
})
export class TransactionExplorerComponent extends ExplorerComponent implements OnInit {
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
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public appComponent: AppComponent,
  ) {
    super(router, activatedRoute, appComponent);
  }

  ngOnInit() {
  }
  public tokenConverter(value: number) {
    return this.appComponent.tokenConverter(value, this.item.rates);
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
