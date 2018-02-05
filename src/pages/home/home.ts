import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import leaflet from 'leaflet';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  marcador_agregado = leaflet.featureGroup();
  
  constructor(public navCtrl: NavController) {
 
  }
 
  ionViewDidEnter() {
    this.loadmap();
  }
 
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup(); //contenedor de cosas para el mapa
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => { //marcador con un evento on click
        //accion al click del marcador de ubicacion
      })
      markerGroup.addLayer(marker); //agrego el marcador al contenedor
      this.map.addLayer(markerGroup); //agrego el contenedor al mapa
      }).on('locationerror', (err) => {
        alert(err.message);
    }).on('click', (e)=>{
      this.map.removeLayer(this.marcador_agregado);
      this.marcador_agregado = leaflet.featureGroup();
      console.log(e);
      let marker: any = leaflet.marker(e.latlng);
      this.marcador_agregado.addLayer(marker);
      this.map.addLayer(this.marcador_agregado);
    })
 
  }

}
