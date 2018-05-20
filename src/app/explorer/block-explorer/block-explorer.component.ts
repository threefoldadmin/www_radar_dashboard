import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../app.component';
import { ExplorerComponent } from '../explorer.component';

@Component({
  selector: 'app-block-explorer',
  templateUrl: './block-explorer.component.html',
  styleUrls: ['../explorer.component.css', './block-explorer.component.css']
})
export class BlockExplorerComponent extends ExplorerComponent implements OnInit {
  @Input() public item;
  @Input() public id;
  public paginator = {
    limit: 10,
    current: {
      transactions: 1
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
    this.pageChanged(1, 'transactions');
  }
  public tokenConverter(value: number) {
    return this.appComponent.tokenConverter(value, this.item.rates);
  }
  public pageChanged(page: number, name: string) {
    this.paginator.current[name] = page;
    this.appComponent.getPageData('block', this.item.height, this.paginator.limit, this.paginator.current[name], name).subscribe(
      data => {
        if (data) {
          this.item.transactions = data;
        }
      }
    );
  }
}
