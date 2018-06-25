import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

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

    constructor(public navCtrl: NavController,
                private pp: PostProvider,
                private alert: AlertController) {
    }

    fechar() {
        this.navCtrl.setRoot(TabsControllerPage);
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad FiltroPage');
    }

    filtrar() {

        if (this.post.estado == null || this.post.especie == null) {

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
}
