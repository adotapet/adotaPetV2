import {Injectable} from '@angular/core';
import {ConnectivityProvider} from '../connectivity/connectivity'
import {Geolocation} from '@ionic-native/geolocation';
import {ModalController, ToastController} from "ionic-angular";
import {ChatPage} from "../../pages/chat/chat";
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
                public geolocation: Geolocation, public modalCtrl: ModalController) {

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

                let main_color = '#d40f00',
                    saturation_value= -20,
                    brightness_value= 5;

                let style = [
                    {
                        "featureType": "administrative.locality",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#ff0200"
                            },
                            {
                                "saturation": 7
                            },
                            {
                                "lightness": 19
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "saturation": "-3"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#748ca3"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#ff0200"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 100
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#ff0200"
                            },
                            {
                                "saturation": "23"
                            },
                            {
                                "lightness": "20"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.school",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffdbda"
                            },
                            {
                                "saturation": "0"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#ff0200"
                            },
                            {
                                "saturation": "100"
                            },
                            {
                                "lightness": 31
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#f39247"
                            },
                            {
                                "saturation": "0"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "hue": "#008eff"
                            },
                            {
                                "saturation": -93
                            },
                            {
                                "lightness": 31
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffe5e5"
                            },
                            {
                                "saturation": "0"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "hue": "#bbc0c4"
                            },
                            {
                                "saturation": -93
                            },
                            {
                                "lightness": -2
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#ff0200"
                            },
                            {
                                "saturation": -90
                            },
                            {
                                "lightness": -8
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#e9ebed"
                            },
                            {
                                "saturation": 10
                            },
                            {
                                "lightness": 69
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#e9ebed"
                            },
                            {
                                "saturation": -78
                            },
                            {
                                "lightness": 67
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    }
                ]

                let mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,

                    styles: style,

                };

                // let mapElement = {
                //     elementType: geometry,
                //     "stylers": [
                //     { "color": "#CCFFFF" }
                // ]

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

    addMarker(lat: number, lng: number, img: string, pet, key) {

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            title: 'TESTE',
            // icon: img

        });

        this.markers.push(marker);

        // let info_window = new google.maps.InfoWindow({
        //     content: "Loading..."
        // });

        //let that = this;
        marker.addListener('click', (event) => {

            console.log('clicked', event);
            let modal = this.modalCtrl.create(ChatPage, {"pet": pet, "key": key});
            modal.present();

        });

    }




}