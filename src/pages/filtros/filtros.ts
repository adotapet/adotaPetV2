import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

import {Post} from "../../models/post";
import {PostProvider} from "../../providers/post/post";

import {AdotePage} from "../adote/adote";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";


@Component({
    selector: 'page-filtro',
    templateUrl: 'filtros.html',

})
export class FiltroPage {

    post = {} as Post;
    rootPage: any;

    private path = 'BR/adocao/pets';
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private pp: PostProvider,
                private alert: AlertController

    ) {
    }
    fechar() {
        // this.navCtrl.push(TabsControllerPage);
        this.navCtrl.setRoot(TabsControllerPage);
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad FiltroPage');


    }

    filtrar(){

        if(this.post.estado == null || this.post.especie == null){

            let alert = this.alert.create({
                title: 'Selecione um Estado e Especie',
                buttons: ['OK']
            });
            alert.present();

        } else {
            localStorage.setItem('adotapet_filtros', JSON.stringify(this.post));
            this.navCtrl.push(TabsControllerPage);
        }






    }



    async listPets(){
        // this.db.list(this.path, ref => ref.orderByChild('estado').equalTo(this.estado)).snapshotChanges().subscribe((data) => {
        //
        //   this.posts = data;
        //
        //
        //
        //
        //
        //   console.log(data)

        // });

    }
}
