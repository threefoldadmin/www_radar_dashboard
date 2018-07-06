import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

import { SocketService } from '../services/socket.service';
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenPriceChartComponent } from './dashboard/token-price-chart/token-price-chart.component';
import { UnitPriceChartComponent } from './dashboard/unit-price-chart/unit-price-chart.component';
import { NodesMapsComponent } from './dashboard/nodes-maps/nodes-maps.component';
import { TokenPriceHighchartComponent } from './dashboard/token-price-highchart/token-price-highchart.component';

import { ExplorerComponent } from './explorer/explorer.component';
import { AddressExplorerComponent } from './explorer/address-explorer/address-explorer.component';
import { BlockExplorerComponent } from './explorer/block-explorer/block-explorer.component';
import { TransactionExplorerComponent } from './explorer/transaction-explorer/transaction-explorer.component';
import { AmountComponent } from './amount/amount.component';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TokenPriceChartComponent,
    UnitPriceChartComponent,
    NodesMapsComponent,
    ExplorerComponent,
    AddressExplorerComponent,
    LoaderComponent,
    BlockExplorerComponent,
    TransactionExplorerComponent,
    AmountComponent,
    TokenPriceHighchartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    ChartModule
  ],
  providers: [
    SocketService,
    DataService,
    ApiService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } // add as factory to your providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
