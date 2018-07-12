import { Component, OnInit, Input } from '@angular/core';
import * as HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap';
import * as L from 'leaflet';

const OSM_TILE_LAYER_URL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
const BOUNDS = new L.LatLngBounds(new L.LatLng(40.712, -74.227), new L.LatLng(40.774, -74.125));

@Component({
  selector: 'app-nodes-maps',
  templateUrl: './nodes-maps.component.html',
  styleUrls: ['./nodes-maps.component.css', '../dashboard.component.css']
})

export class NodesMapsComponent implements OnInit {
  @Input() public peers = [];

  // GeoMap
  public geoMap = {
    map: null,
    layers: [],
    fullScreen: false,
    options: {
      layers: [
        L.tileLayer(OSM_TILE_LAYER_URL,
          {
            subdomains: 'abcd',
            maxZoom: 11
          })
      ],
      zoom: 1,
      minZoom: 1,
      maxBounds: [
        [90, -180],
        [-90, 180]
      ],
      center: BOUNDS.getCenter()
    }
  };

  // HeatMap
  public heatMap = {
    map: null,
    fullScreen: false,
    options: {
      layers: [
        L.tileLayer(OSM_TILE_LAYER_URL,
          {
            subdomains: 'abcd',
            maxZoom: 11
          })
      ],
      zoom: 1,
      minZoom: 1,
      maxBounds: [
        [90, -180],
        [-90, 180]
      ],
      center: BOUNDS.getCenter()
    },
    layerConfigs: {
      'radius': 12,
      // 'maxOpacity': 0.92,
      'minOpacity': 0.4,
      'scaleRadius': false,
      'useLocalExtrema': true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count',
      blur: 0.7,
    },
    layers: {
      max: 9999,
      min: 1,
      data: []
    }
  };

  public heatMapLayer = new HeatmapOverlay(this.heatMap.layerConfigs);

  constructor() { }

  ngOnInit() {
    this.setGeoMapData();
    this.setHeatMapData();
  }
  public setGeoMapData() {
    for (const peer of this.peers) {
      const coordinate = L.circle([peer.geo.coordinates[0], peer.geo.coordinates[1]], { color: '#17f9be' });
      this.geoMap.layers.push(coordinate);
    }
  }
  public onGeoMapReady(map: L.Map) {
    this.geoMap.map = map;
  }
  public setHeatMapData() {
    for (const peer of this.peers) {
      const coordinate = { lat: peer.geo.coordinates[0], lng: peer.geo.coordinates[1], count: peer.geo.count };
      this.heatMap.layers.data.push(coordinate);
    }
    this.heatMapLayer.setData(this.heatMap.layers);
  }
  public onHeatMapReady(map: L.Map) {
    this.heatMap.map = map;
    this.heatMapLayer.onAdd(map);
  }
  public fullScreen(name: string) {
    this[name].fullScreen = !this[name].fullScreen;
    setTimeout(() => { this[name].map.invalidateSize(true); }, 100);

    const currentZoom = this[name].map.getZoom();

    if (this[name].fullScreen && currentZoom === 1) {
      const center = BOUNDS.getCenter();
      this[name].map.setView(center, currentZoom + 1);
    }
  }
}
