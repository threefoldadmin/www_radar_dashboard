import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public lastBlock;
  public lastBlocks = [];
  public peers = [];
  public tokenPriceHistory = [];

  constructor(
    private appComponent: AppComponent,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();

    const lastBlockSub = this.appComponent.dataService.lastBlock$.subscribe(
      block => {
        if (block) {
          this.lastBlock = block;

          // Check&&Replace the last block

          if (this.lastBlocks.length > 0 && this.lastBlock.height > this.lastBlocks[0].height) {
            this.appComponent.notify.success('New block', `#${block.height}`);
            this.lastBlocks.unshift(this.lastBlock);
            this.lastBlocks.splice(-1, 1);
            this.setBlocksTimeDiff();
          }
        }
      }
    );
    const lastBlocksSub = this.appComponent.dataService.lastBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.lastBlocks = blocks;
          this.setBlocksTimeDiff();
        }
      }
    );
    this.subscriptions.push(lastBlockSub, lastBlocksSub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  public getData() {
    this.appComponent.getData();
    this.getPeers();
    this.getTokenPriceHistory();
  }
  public getPeers() {
    this.appComponent.API('get', 'peers').subscribe(
      data => {
        if (data) {
          this.peers = data;
        }
      },
    );
  }
  public getTokenPriceHistory() {
    this.appComponent.API('get', 'exchanges/month').subscribe(
      data => {
        if (data) {
          this.tokenPriceHistory = data;
        }
      },
    );
  }
  public search(id) {
    this.router.navigate([`/search/${id}`]);
  }
  public networkPrice() {
    const computeUnitsTotal = this.getStaticTechData('computeUnitsTotal');
    const computeUnitPriceUSD = this.getStaticData('computeUnitPriceUSD');
    const storageUnitsTotal = this.getStaticTechData('storageUnitsTotal');
    const storageUnitPriceUSD = this.getStaticData('storageUnitPriceUSD');

    return ( computeUnitsTotal * computeUnitPriceUSD + storageUnitsTotal * storageUnitPriceUSD ) * 12;
  }
  public totalTokenCapitalization() {
    const totalSupply = this.getStaticTechData('totalSupply');
    const tokenPrice = this.getStaticData('weightedTokenPriceUSD');
    return totalSupply * tokenPrice;
  }
  public setBlocksTimeDiff() {
    this.lastBlocks.forEach((block) => {
      block.ago = this.calculateTimeDiff(block.timeStamp);
    });
  }
  public calculateTimeDiff(timestamp: number) {
    const blockTime = moment.unix(timestamp);
    const blockTimeFormatted = moment.unix(timestamp).format('DD.MM.YYYY');
    const now = moment();
    let diffText;
    const diff = moment.duration(now.diff(blockTime)).asSeconds();
    if ( diff < 1 ) {
      diffText = '1s ago';
    } else if (diff < 60) {
      diffText = `${Math.ceil(diff)}s ago`;
    } else if (diff > 60 && diff <= 3600) {
      diffText = `${Math.ceil(diff / 60) }m ago`;
    } else if (diff > 3600 && diff <= 86400) {
      diffText = `${Math.ceil(diff / 3600)}h ago`;
    } else {
      diffText = blockTimeFormatted;
    }
    return diffText;
  }
  public tokens(value) {
    return this.appComponent.tokens(value);
  }
  public tokenConverter(block: any) {
    return this.appComponent.tokenConverter(block.minerReward, block.rates);
  }
  public currentCurrencyPair() {
    return this.appComponent.currentCurrencyPair;
  }
  public getStaticData(name: string) {
    return this.appComponent.converter(this.appComponent[name]);
  }
  public getStaticTechData(name: string, divideType?: string) {
    let divisor = 1;
    if (divideType === 'k') {
      divisor = 1000;
    } else if (divideType === 'm') {
      divisor = 1000000;
    }
    return this.appComponent[name] / divisor;
  }
}
