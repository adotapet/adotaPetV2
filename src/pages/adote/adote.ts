import {Component} from '@angular/core';
import {NavController, ToastController, LoadingController, IonicPage} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';


import {AuthProvider} from "../../providers/auth/auth";
import {LocationsProvider} from "../../providers/locations/locations";
import {Geolocation} from "@ionic-native/geolocation";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-adote',
    templateUrl: 'adote.html'
})
export class AdotePage {

    posts: any[];
    postRef: AngularFireList<any>;
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


    }


    ionViewDidLoad() {
        this.listPets();
    }

    listPets() {

        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();
        this.postRef = this.db.list('adocao/pets/', ref => ref.limitToFirst(this.listCount));
        this.postRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(pets => {
            pets.map(pet => {
                this.location.getDistancia(pet.coordenadas).then(distancia => {
                    pet.distancia = distancia[0].distance;
                    pets.sort((locationA, locationB) => {
                        return locationA.coordenadas.distance - locationB.coordenadas.distance
                    });
                });
            });
            this.posts = pets;
            loading.dismiss();
        })

    }

    doInfinite(event) {
        console.log('event', event);
        this.listCount = this.listCount + 10;

        this.posts = [];
        this.listPets();
        event.complete();
    }


    goToPerfil(key, data) {
        this.navCtrl.push('PerfilPage', {"pet": data, "key": key});
    }


}
