import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
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
    private appComponent: AppComponent,
    public activatedRoute: ActivatedRoute,
    public router: Router
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
    let path = 'block';
    if (this.id.match(/[a-z]/i)) {
      path = 'hashes';
    }
    this.appComponent.API('get', path, this.id).subscribe(
      data => {
        if (data) {
          this.item = data;
          if (this.item.hashType === 'blockid') {
            this.item.transactions = [];
            this.getTransactions();
          }
        }
      },
    );
  }
  public getTransactions() {
    const path = `block/${this.item.height}/transactions`;
    this.appComponent.API('get', path).subscribe(
      data => {
        if (data) {
          this.item.transactions = data;
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
}
