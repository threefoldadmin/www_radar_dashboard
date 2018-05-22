import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public id;
  public item;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public appComponent: AppComponent,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.item = null;
      this.getItem();
    });
    const lastBlockSub = this.appComponent.dataService.lastBlock$.subscribe(
      block => {
        if (block) {
          if (this.item) {
            this.item.lastBlockHeight = block.height;
          }
        }
      }
    );
    this.subscriptions.push(lastBlockSub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  public getItem() {
    let type = 'block';
    if (this.id.match(/[a-z]/i)) {
      type = 'hashes';
    }
    const path = `${type}/${this.id}`;
    this.appComponent.API('get', path).subscribe(
      data => {
        if (data) {
          this.item = data;
        }
      },
    );
  }
  public hashName(type: string) {
    let name;
    switch (type) {
      case 'blockid':
        name = 'Block';
        break;
      case 'transactionid':
        name = 'Transaction';
        break;
      case 'unlockhash':
        name = 'Address';
        break;
      default:
        name = 'Invalid result';
    }
    return name;
  }
  public newSearch(id) {
    this.router.navigate([`/search/${id}`]);
  }
  public tokens(value) {
    return this.appComponent.tokens(value);
  }
  public currentCurrencyPair() {
    return this.appComponent.currentCurrencyPair;
  }
}
