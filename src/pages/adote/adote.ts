
import { Component } from "@angular/core";
import {
  NavController,
  ToastController,
  LoadingController,
  Platform,
} from "ionic-angular";
import { AdmobProvider } from "./../../providers/admob/admob";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/combineLatest";

import { LocationsProvider } from "../../providers/locations/locations";
import { Geolocation } from "@ionic-native/geolocation";
import { map } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";
import { PerfilPage } from "../perfil/perfil";
import { AuthProvider } from "../../providers/auth/auth";
import { Post } from "../../models/post";

@Component({
  selector: "page-adote",
  templateUrl: "adote.html",
})
export class AdotePage {
  loading = false; // definir carregamento do sckleton

  allPets: any[];
  listCount: number = 10;
  bgImg: any;
  resource: any;
  //anuncio;
  constructor(
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public location: LocationsProvider,
    public geolocation: Geolocation,
    public auth: AuthProvider,
    private admob: AdmobProvider

  ) {
    this.listPets();
    this.auth.getUserLogadoPerfil();

  }
  ionViewCanEnter() {
    this.admob.showBanner();
    // this.admob.hiddenBanner()
  }
  listPets() {
    this.loading = true;
    // let loading = this.loadingCtrl.create({ // Removendo loadding
    //   content: 'Carregando...'
    // });
    // loading.present();

    setTimeout(() => {
      // loading.dismiss();
      this.loading = false;
    }, 8000);
    this.db.list<Post>("adocao/pets/").snapshotChanges().pipe(
      // Add tipo retorno pets
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(
      async (pets: Post[]) => {
        // retorntando array tipado
        let coords = await this.location.getCurrentPosition();
        let petsComDistancia = await this.location.applyHaversine(
          pets,
          coords
        );
        // console.log("pets", petsComDistancia);
        petsComDistancia.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });
        const allPetsonemonths: Post[] = petsComDistancia.filter((filtrado) => {
          let convertdata = { year: 0, month: 0, days: 0 };
          let hj = {
            day: convertdata.days = new Date().getDate(),
            month: convertdata.month = new Date().getMonth() + 1,
            year: convertdata.year = new Date().getFullYear(),
          };
          let data = filtrado.data; // Rebendo do banco formato "17/07/2020"
          const dataSplit = data.split("/");
          const day = dataSplit[0]; // 15
          const month = dataSplit[1]; // 06
          const year = dataSplit[2]; // 2020

          // console.log(hj.year);
          if (Number(year)
            === hj.year
            && (Number(month)
              === hj.month || Number(month)
              === hj.month - 1 || Number(month)
              === hj.month - 2)) {
            return filtrado;
          }
        }
        );

        // console.log("Filtrado e ok", allPetsonemonths)
        // loading.dismiss();
        // this.allPets = petsComDistancia;
        this.allPets = allPetsonemonths;
        this.loading = false;
      },
      (error) => {
        // loading.dismiss();
        this.loading = false;
        console.log("errrooooo", error);
      }
    );
  }
  goToPerfil(pet) {
    this.navCtrl.push(PerfilPage, { pet: pet });
  }
}
