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

        this.geolocation.getCurrentPosition().then((position) => {
            let usersLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            localStorage.setItem("currentLocation", JSON.stringify(usersLocation));
        });

        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

            let coordenadas = [];
            this.afDb.list('BR/adocao/pets').valueChanges().subscribe(dados => {
                dados.forEach(function (item: any) {
                    if (item.coordenadas) {
                        coordenadas.splice(0, 0, item.coordenadas);
                    }
                });

                this.data = this.applyHaversine(coordenadas);
                console.log("THIS.DATA", this.data);
                this.data.sort((locationA, locationB) => {
                    return locationA.distance - locationB.distance;
                });


                resolve(this.data);
            });
        });

    }

    applyHaversine(locations) {

        let usersLocation = localStorage.getItem("currentLocation");
        locations.map((location) => {

            let placeLocation = {
                lat: location.lat,
                lng: location.lng
            };

            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
        });
        console.log("LOCATIONS", locations);

        return locations;

    }

    getDistanceBetweenPoints(start, end, units) {
        console.log("PARAMETROS__DISTANCIA", start, end, units);

        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        console.log("DISTANCIA", d);
        return d;

    }

    toRad(x) {
        return x * Math.PI / 180;
    }
}