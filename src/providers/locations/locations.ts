import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "@angular/fire/database";
import {Geolocation} from '@ionic-native/geolocation';


@Injectable()
export class LocationsProvider {

    data: any;
    currentLocation: any;

    constructor(public http: HttpClient, public afDb: AngularFireDatabase, public geolocation: Geolocation) {

    }

    public applyHaversine(locations, usersLocation):any {

      let newData = [];
        locations.map((location) => {
          if(!location.coordenadas) {
            console.log('!haversine', location.coordenadas);
          }
          if(location.coordenadas){
            let placeLocation = {
              lat: location.coordenadas.lat,
              lng: location.coordenadas.lng
            };

            location.distance = this.getDistanceFromLatLonInKm(
              usersLocation,
              placeLocation
            ).toFixed(2);
            newData.push(location);
          }
        });

        return newData;
    }


    getDistanceFromLatLonInKm(userLocation, placeLocation) {

        let lat1 = userLocation.lat;
        let lon1 = userLocation.lng;
        let lat2 = placeLocation.lat;
        let lon2 = placeLocation.lng;

        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((lon1 - lon2) * p))) / 2;

        let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }

    getCurrentPosition(): Promise<any> {
        return new Promise(resolve => {
            this.geolocation.getCurrentPosition().then((position) => {
                let usersLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                localStorage.setItem("currentLocation", JSON.stringify(usersLocation));
                resolve(usersLocation);
            });
        });
    }

    getDistancia(petCoords) {
        petCoords = [petCoords];

        return new Promise(resolve => {
            this.geolocation.getCurrentPosition().then((position) => {
                let userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                let distancia = this.applyHaversine(petCoords, userLocation);
                resolve(distancia);
            });

        });
    }

}
