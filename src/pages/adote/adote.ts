import {Component} from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import {LocationsProvider} from "../../providers/locations/locations";
import {Geolocation} from "@ionic-native/geolocation";
import {map} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/database";
import {PerfilPage} from "../perfil/perfil";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-adote',
  templateUrl: 'adote.html'
})
export class AdotePage {

  allPets: any[];
  listCount: number = 10;

  constructor(
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public location: LocationsProvider,
    public geolocation: Geolocation,
    public auth: AuthProvider
  ) {
    this.listPets();
    this.auth.getUserLogadoPerfil();
  }

  listPets() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 6000);
    this.db.list('adocao/pets/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ).subscribe(async (pets: any) => {

      let coords = await this.location.getCurrentPosition();

      let petsComDistancia = await this.location.applyHaversine(pets, coords);
      console.log('pets', petsComDistancia);
      petsComDistancia.sort((locationA, locationB) => {
        return locationA.distance - locationB.distance
      });
      loading.dismiss();
      this.allPets = petsComDistancia;

    }, error => {
      loading.dismiss();
      console.log('errrooooo', error);
    });

  }

  goToPerfil(pet) {
    this.navCtrl.push(PerfilPage, {"pet": pet});
  }

}
