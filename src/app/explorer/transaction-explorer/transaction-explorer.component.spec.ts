import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionExplorerComponent } from './transaction-explorer.component';

describe('TransactionExplorerComponent', () => {
  let component: TransactionExplorerComponent;
  let fixture: ComponentFixture<TransactionExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
