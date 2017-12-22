import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from "../mensagem/mensagem";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html'
})
export class PerfilPage {

    pet: any;
    key: string = 'aaaaaaaa';
    user: any;
    usuarioAtual: any;
    donoDaPostagem: boolean;


    constructor(public navCtrl: NavController, public params: NavParams, private afAuth: AngularFireAuth) {
        this.pet = params.get('pet');
        this.key = params.get('key');
        console.log(this.key);
    }

    ionViewDidLoad() {

        this.afAuth.authState.subscribe(data => {
            if (data && data.email && data.uid) {
                this.usuarioAtual = data.uid;
                if (this.usuarioAtual == this.pet.user) {

                    this.donoDaPostagem = true;
                    console.log(this.donoDaPostagem)
                } else {
                    this.donoDaPostagem = false;
                    console.log(this.usuarioAtual)
                }

            }
        });

    }

    goToChat() {
        let key = this.key;
        let idGrouped = `${this.pet.user}_${this.usuarioAtual}_${key}`;
        console.log(key, this.pet.user);
        this.navCtrl.push(MensagemPage, {"key": key, "idGrouped": idGrouped});
    }


}
