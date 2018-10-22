import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public markets = [];
  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit() {
    const marketsSub = this.appComponent.dataService.lastBlock$.subscribe(
      block => {
        // if (block) {
        //   if (this.item) {
        //     this.item.lastBlockHeight = block.height;
        //   }
        // }
      }
    );
    this.subscriptions.push(marketsSub);
  }

}
