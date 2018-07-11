import { Component, OnInit, Input } from '@angular/core';
import * as HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap';
import * as L from 'leaflet';

const OSM_TILE_LAYER_URL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
const BOUNDS = new L.LatLngBounds(new L.LatLng(40.712, -74.227), new L.LatLng(40.774, -74.125));
// 'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png'


@Component({
  selector: 'app-nodes-maps',
  templateUrl: './nodes-maps.component.html',
  styleUrls: ['./nodes-maps.component.css', '../dashboard.component.css']
})

export class NodesMapsComponent implements OnInit {
  @Input() public peers = [];

  // GeoMap
  public geoMapOptions = {
    layers: [
      L.tileLayer(OSM_TILE_LAYER_URL,
        {
          subdomains: 'abcd',
          maxZoom: 10
        })
    ],
    zoom: 1,
    minZoom: 1,
    maxBounds: [
      [90, -180],
      [-90, 180]
    ],
    center: BOUNDS.getCenter(),
  };

  public geoMapLayers = [];

  // HeatMap
  public heatMapOptions = {
    layers: [
      L.tileLayer(OSM_TILE_LAYER_URL,
        {
          subdomains: 'abcd',
          maxZoom: 10
        })
    ],
    zoom: 1,
    minZoom: 1,
    maxBounds: [
      [90, -180],
      [-90, 180]
    ],
    center: BOUNDS.getCenter()
  };
  public heatMapLayerConfigs = {
    'radius': 10,
    'maxOpacity': 0.66,
    'minOpacity': 0.5,
    'scaleRadius': false,
    'useLocalExtrema': true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count',
    blur: 0.68,
    'gradient': {
      '0.25': '#3c4dcc',
      '0.55': '#d93c39',
      '0.85': '#e86035',
      '1.0': '#ffed50'
    },
  };
  public heatMapLayers = {
    max: 999999,
    min: 1,
    data: []
  };
  public heatMapLayer = new HeatmapOverlay(this.heatMapLayerConfigs);
  constructor() { }

  ngOnInit() {
    this.setGeoMapData();
    this.setHeatMapData();
  }
  public setGeoMapData() {
    for (const peer of this.peers) {
      const coordinate = L.circle([peer.geo.coordinates[0], peer.geo.coordinates[1]], { color: '#00ffff' });
      this.geoMapLayers.push(coordinate);
    }
  }
  public setHeatMapData() {
    for (const peer of this.peers) {
      const coordinate = { lat: peer.geo.coordinates[0], lng: peer.geo.coordinates[1], count: peer.geo.count };
      this.heatMapLayers.data.push(coordinate);
    }
    this.heatMapLayer.setData(this.heatMapLayers);
  }
  public onHeatMapReady(map: L.Map) {
    this.heatMapLayer.onAdd(map);
  }
}
