import { Component, OnInit } from '@angular/core';
import { GoongService } from '../@app-core/http/goong/goong.service';
import { Geolocation } from '@capacitor/geolocation';

import { NgZone } from '@angular/core';

declare var google:any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  map: any;
  markerPlace: any = {};
  foundPlaces: any = []
  currentLatLng: any = {
    lat: 0,
    lng: 0
  };

  apiKey = "moh7iGN6X9muXFV9wcXkwFSi5xj7CeSJYzwBM98Q";

  constructor(
    private goong: GoongService,
    private zone: NgZone
  ) {}

  async printCurrnetPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    const coords = coordinates.coords;
    console.log('Current position:', coords);
    this.currentLatLng.lat = coords.latitude;
    this.currentLatLng.lng = coords.longitude;
  }
  
  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.printCurrnetPosition();
    setTimeout(() => {
      this.loadMap(this.currentLatLng.lat, this.currentLatLng.lng);
    }, 5500);
  }

  changeLocateSearch(res: any){
    const inputValue = res.detail.value
    this.goong.findPlace(this.apiKey, inputValue).subscribe({
      next: (data: any) => {
        this.foundPlaces = data.predictions;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  async loadMap(lat: any, lng: any){
    const mapOptions = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    const marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      map: this.map,
      draggable: false,
      title: "Vị trí của bạn"
    })
    //get the marker position by goong get current
    this.goong.getCurrentPosition(this.apiKey, lat, lng).subscribe({
      next: (data: any) => {
        this.markerPlace = data.results[0];
        console.log(this.markerPlace);
      }
    })
    
    google.maps.event.addListener(this.map, 'dragend', (event: any) => {
      const center = this.map.getCenter();
      this.goong.getCurrentPosition(this.apiKey, center.lat(), center.lng()).subscribe(
        {
          next: (data: any) => {
            setTimeout(() => {
              this.zone.run(() => {
                this.markerPlace = data.results[0]
                console.log(this.markerPlace);
              });
            }, 750);
          }
        }
      )
    });
    this.map.addListener('center_changed', () => {
      marker.setPosition(this.map.getCenter());
    });
  };
  markToResult(pos: any){
    console.log(pos);
    
    this.goong.getId(this.apiKey, pos).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadMap(data.result.geometry.location.lat, data.result.geometry.location.lng)
      }
    })
  }
}
