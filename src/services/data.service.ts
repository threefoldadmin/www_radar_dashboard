import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  public lastBlock$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public lastBlocks$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public exchangeRates$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currency$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public tokenPriceBTCAlphaHistory$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public markets$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }
}
