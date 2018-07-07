import {Injectable} from '@angular/core';
import {ConnectivityProvider} from '../connectivity/connectivity'
import {Geolocation} from '@ionic-native/geolocation';
import {ToastController} from "ionic-angular";
import {getCss} from "ionic-angular/es2015/util/dom";
import {PerfilPage} from "../../pages/perfil/perfil";
/*
  Generated class for the GoogleMapsProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

declare var google;

@Injectable()
export class GoogleMapsProvider {

    mapElement: any;
    pleaseConnect: any;
    map: any;
    mapInitialised: boolean = false;
    mapLoaded: any;
    mapLoadedObserver: any;
    markers: any = [];
    // add your apiKey for GoogleMaps
    // example: apiKey: string = 'ARfdaDE..';
    apiKey: string = "AIzaSyAYje10phGzysUfgu6V8jqcTiraa3COSLM";

    constructor(public connectivityService: ConnectivityProvider,
                public geolocation: Geolocation) {

    }

    init(mapElement: any, pleaseConnect: any): Promise<any> {

        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;

        return this.loadGoogleMaps();

    }

    loadGoogleMaps(): Promise<any> {

        return new Promise((resolve) => {

            if (typeof google == "undefined" || typeof google.maps == "undefined") {

                console.log("Google maps JavaScript needs to be loaded.");
                this.disableMap();

                if (this.connectivityService.isOnline()) {

                    window['mapInit'] = () => {

                        this.initMap().then(() => {
                            resolve(true);
                        });

                        this.enableMap();
                    }

                    let script = document.createElement("script");
                    script.id = "googleMaps";

                    if (this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
                    } else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }

                    document.body.appendChild(script);

                }
            }
            else {

                if (this.connectivityService.isOnline()) {
                    this.initMap();
                    this.enableMap();
                }
                else {
                    this.disableMap();
                }

            }

            this.addConnectivityListeners();

        });

    }

    initMap(): Promise<any> {

        this.mapInitialised = true;

        return new Promise((resolve) => {

            this.geolocation.getCurrentPosition().then((position) => {

                // UNCOMMENT FOR NORMAL USE
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //let latLng = new google.maps.LatLng(40.713744, -74.009056);

                let mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.map = new google.maps.Map(this.mapElement, mapOptions);
                resolve(true);

            });

        });

    }

    disableMap(): void {

        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }

    }

    enableMap(): void {

        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }

    }

    addConnectivityListeners(): void {

        document.addEventListener('online', () => {

            console.log("online");

            setTimeout(() => {

                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    this.loadGoogleMaps();
                }
                else {
                    if (!this.mapInitialised) {
                        this.initMap();
                    }

                    this.enableMap();
                }

            }, 2000);

        }, false);

        document.addEventListener('offline', () => {

            console.log("offline");

            this.disableMap();

        }, false);

    }

    addMarker(lat: number, lng: number, img: string) {

        let html = "<ion-card> " +
            "<ion-item><ion-avatar item-start style=\"width: 130px;float: left;\" >" +
            "<img src=" + img + " style='border-radius: 50%;overflow: hidden; width: 50px; height: 50px;'> " +
            "</ion-avatar> <p style=\"text-align: center;position: absolute;left: 58px;top: 2px;\">Bobby</p> " +
            "<button onclick=\"goToPerfil()\" value='goToPerfil' id='goToPerfil' color=\"danger\" ion-button=\"\" round=\"\" class=\"disable-hover button button-ios button-default button-default-ios button-round button-round-ios button-ios-danger\" style=\"background-color: #f53d3d;height: 1.8em;font-size: 1.6rem;color: #fff;position: relative;top: 6px;\">" +
            "<span class=\"button-inner\">Ver Perfil</span><div class=\"button-effect\"></div></button></ion-item></ion-card>";

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            title: 'TESTE',
            html: html
        });

        this.markers.push(marker);

        let info_window = new google.maps.InfoWindow({
            content: html
        });

        marker.addListener('click', function () {
            info_window.open(this.map, marker);
        });


    }


}