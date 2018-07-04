import {Component} from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';


import {AuthProvider} from "../../providers/auth/auth";
import {LocationsProvider} from "../../providers/locations/locations";

@Component({
    selector: 'page-adote',
    templateUrl: 'adote.html'
})
export class AdotePage {

    posts: any;
    user: any;
    filtro: any;
    list: any;
    private path = 'BR/adocao/pets';

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                public navCtrl: NavController,
                public toast: ToastController,
                private auth: AuthProvider,
                public loadingCtrl: LoadingController, public location: LocationsProvider) {

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

        let filtros = JSON.parse(localStorage.getItem('adotapet_filtros'));
        if (filtros) {
            this.filtro = filtros;
        } else {
            this.filtro = {"estado": "DF", "especie": 'Todos'};

        }
        console.log(this.filtro.especie);


        if (this.filtro.especie == "Todos") {

            this.db.list(this.path, ref => ref.orderByChild('estado').equalTo(this.filtro.estado))
                .snapshotChanges()
                .subscribe((data) => {


                    this.posts = data.sort();

                    // console.log(data.values())
                    data.forEach(data => {

                        this.list = Array.of(data.payload.val())

                    });
                    console.log(this.list)

                    console.log(this.posts)


                });

            loading.dismiss();
        }
        else {

            this.db.list(this.path, ref => ref.orderByChild('filtro')
                .equalTo(this.filtro.estado + '_' + this.filtro.especie)).snapshotChanges()
                .subscribe((data) => {
                    console.log(data)
                    console.log(this.filtro.estado + '_' + this.filtro.especie)

                    this.posts = data;
                    //
                    //
                    // this.ordernar =  data;
                    // this.posts = this.ordernar.payload.val().sort(function(a,b){return  a.timestamp - b.timestamp});
                    // console.log(this.ordernar.payload.val());


                });
            loading.dismiss();
        }


        // this.db.list('BR/adocao/pets').snapshotChanges().subscribe( (data) => {
        //
        //
        //   console.log(data);
        //
        //
        //   this.posts =  data.reverse();
        //
        // });
        // this.posts = data;
        // console.log(data);
        // });
    }

    goToPerfil(key, data) {
        this.navCtrl.push(PerfilPage, {"pet": data, "key": key});
    }


}
