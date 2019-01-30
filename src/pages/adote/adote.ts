import {Component} from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import {LocationsProvider} from "../../providers/locations/locations";
import {Geolocation} from "@ionic-native/geolocation";
import {map} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/database";
import {PerfilPage} from "../perfil/perfil";

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
    public geolocation: Geolocation
  ) {
    this.listPets();
  }

  listPets() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

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
      console.log('errrooooo', error);
    });

  }

  goToPerfil(key, data) {
    this.navCtrl.push(PerfilPage, {"pet": data, "key": key});
  }

}
