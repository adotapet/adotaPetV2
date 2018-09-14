import {Component} from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';


import {AuthProvider} from "../../providers/auth/auth";
import {LocationsProvider} from "../../providers/locations/locations";
import {Geolocation} from "@ionic-native/geolocation";

@Component({
    selector: 'page-adote',
    templateUrl: 'adote.html'
})
export class AdotePage {

    posts: any;
    user: any;
    filtro: any;
    list: any;
    listCount: number = 5;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                public navCtrl: NavController,
                public toast: ToastController,
                private auth: AuthProvider,
                public loadingCtrl: LoadingController,
                public location: LocationsProvider,
                public geolocation: Geolocation) {


    }


    ionViewDidLoad() {

        this.auth.getUser().then(user => {
            this.user = user;
        });
        console.log(this.user);
        this.listPets();


        this.afAuth.authState.subscribe(data => {
            if (data && data.email && data.uid) {
                this.toast.create({
                    message: `Bem-vindo ao Adota Pet, ${data.email}`,

                    duration: 1900
                }).present();
            } else {
                this.toast.create({
                    message: `Bem-Vindo ao Adota Pet`,
                    duration: 1000
                });
                console.log(data);

            }

        });
    }

    listPets() {

        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();
        this.db.list('adocao/pets/', ref => ref.limitToFirst(this.listCount)).snapshotChanges().subscribe(pets => {
            let petsData = [];

            let map = pets.map((pet: any) => {
                let petKey = pet.key;
                let payload = pet.payload.val();
                let coords = pet.payload.val().coordenadas;
                let coordenadas = {"coordenadas": coords};
                this.getDistancia(coordenadas).then(dist => {
                    petsData.splice(0, 0, {"petKey": petKey, "payload": payload, "distancia": dist[0].distance});
                    petsData.sort((locationA, locationB) => {
                        return locationA.distancia - locationB.distancia
                    });
                });

            });

            console.log(map.length, petsData);


            this.posts = petsData;


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


    getDistancia(petCoords) {
        petCoords = [petCoords];

        return new Promise(resolve => {
            this.geolocation.getCurrentPosition().then((position) => {
                let userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                let distancia = this.location.applyHaversine(petCoords, userLocation);
                resolve(distancia);
            });

        });
    }

    goToPerfil(key, data) {
        this.navCtrl.push(PerfilPage, {"pet": data, "key": key});
    }


}
