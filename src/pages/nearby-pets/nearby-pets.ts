import {Component, ElementRef, ViewChild} from '@angular/core';
import {LocationsProvider} from '../../providers/locations/locations';
import {GoogleMapsProvider} from '../../providers/google-maps/google-maps';
import {IonicPage, ModalController, NavController, Platform} from 'ionic-angular';
import {PetsPerdidosPage} from "../pets-perdidos/pets-perdidos";

/**
 * Generated class for the NearbyPetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-nearby-pets',
    templateUrl: 'nearby-pets.html',
})
export class NearbyPetsPage {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    constructor(public navCtrl: NavController,
                public maps: GoogleMapsProvider,
                public platform: Platform,
                public locations: LocationsProvider,
                public modalCtrl: ModalController) {

    }

    ionViewDidLoad() {

        this.platform.ready().then(() => {

            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            let locationsLoaded = this.locations.load();

            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {
                console.log('MAPA CARREGOU');

                let locations = result[1];

                for (let location of locations) {
                    console.log('NEARBY', location);
                    if (location.distance <= 50) {
                        this.maps.addMarker(location.coordenadas.lat, location.coordenadas.lng, location.icon, location.pet, location.key);
                    }
                }

            });

        });

    }

    newLostPet(tipo: number) {
        console.log(tipo);
        this.navCtrl.push(PetsPerdidosPage, {"tipo": tipo})
    }

}
