import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";
import {Geolocation} from '@ionic-native/geolocation';


@Injectable()
export class LocationsProvider {

    data: any;
    currentLocation: any;

    constructor(public http: HttpClient, public afDb: AngularFireDatabase, public geolocation: Geolocation) {

    }

    load() {

        let locationPromise = new Promise(resolve => {
            this.geolocation.getCurrentPosition().then((position) => {
                let usersLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                localStorage.setItem("currentLocation", JSON.stringify(usersLocation));
                resolve(usersLocation);
            });

        });


        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

            let coordenadas = [];
            locationPromise.then(usersLocation => {

                this.afDb.list('perdidos/pets').snapshotChanges().subscribe(dados => {
                    dados.map((item: any) => {
                        let key = item.key;
                        let item2 = item.payload.val();
                        console.log('item', item2.foto);

                        let objCoords = {
                            "coordenadas": item2.coordenadas,
                            "icon": item2.foto,
                            "pet": item2,
                            "key": key
                        };

                        if (item2.coordenadas) {
                            coordenadas.splice(0, 0, objCoords);
                        }
                    });

                    this.data = this.applyHaversine(coordenadas, usersLocation);
                    console.log("THIS.DATA", this.data);
                    this.data.sort((locationA, locationB) => {
                        return locationA.distance - locationB.distance;
                    });

                    resolve(this.data);
                });


            });

        });

    }

    applyHaversine(locations, usersLocation) {

        locations.map((location) => {

            let placeLocation = {
                lat: location.coordenadas.lat,
                lng: location.coordenadas.lng
            };

            location.distance = this.getDistanceFromLatLonInKm(
                usersLocation,
                placeLocation
            ).toFixed(2);

        });

        return locations;

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

}