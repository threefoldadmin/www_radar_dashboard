import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPriceHighchartComponent } from './token-price-highchart.component';

describe('TokenPriceHighchartComponent', () => {
  let component: TokenPriceHighchartComponent;
  let fixture: ComponentFixture<TokenPriceHighchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenPriceHighchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenPriceHighchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
