import {Component} from '@angular/core';
import {NavController, ToastController, LoadingController, IonicPage, InfiniteScroll} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import {LocationsProvider} from "../../providers/locations/locations";
import {Geolocation} from "@ionic-native/geolocation";
import {map} from "rxjs/operators";

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-adote',
    templateUrl: 'adote.html'
})
export class AdotePage {

    allPets: any[];
    listCount: number = 10;

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        public navCtrl: NavController,
        public toast: ToastController,
        public loadingCtrl: LoadingController,
        public location: LocationsProvider,
        public geolocation: Geolocation
    ) {
        this.listPets().then(pets => {
            console.log('PET', pets);
        });
    }


    listPets(): Promise<any> {

        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });
        loading.present();

        return new Promise(resolve => {

            this.db.list('adocao/pets/').snapshotChanges().pipe(
                map(changes =>
                    changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
                )
            ).subscribe(pets => {
                pets.map((pet) => {
                    this.location.getDistancia(pet.coordenadas).then(distancia => {
                        pet.distancia = distancia[0].distance;
                        pets.sort((locationA, locationB) => {
                            return locationA.coordenadas.distance - locationB.coordenadas.distance
                        });
                    });
                });

                this.allPets = pets;
                loading.dismiss();
                resolve(pets);
            })
        });

    }

    doInfinite(event: InfiniteScroll) {
        setTimeout(() => {
            if (this.listCount > this.allPets.length) {
                event.enable(false);
            } else {
                this.listCount += 10;
                console.log(this.listCount);
                event.complete();
            }
        }, 600);
    }


    goToPerfil(key, data) {
        this.navCtrl.push('PerfilPage', {"pet": data, "key": key});
    }


}
