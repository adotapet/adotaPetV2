import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from "../mensagem/mensagem";
import {AngularFireAuth} from "angularfire2/auth";
import { SocialSharing } from '@ionic-native/social-sharing';


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


    constructor(public navCtrl: NavController, public params: NavParams, private afAuth: AngularFireAuth,
                private socialSharing: SocialSharing) {

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

    whatsappShare(){
        this.pet;
        console.log(this.pet.fotoUrls[0])

        this.socialSharing.shareViaWhatsApp("Olá,meu nome é "  + this.pet.nome + " sou um(a) " + this.pet.especie + " da Raça " + this.pet.raca + " estou a procura de um dono! :D ", null /*Image*/,   " Para me adotar bastar clicar nesse link abaixo e baixar o AdotaPet: " +
            " https://play.google.com/store/apps/details?id=com.labup.adotapet " + " Para ver minha foto acesse: " + this.pet.fotoUrls[0] /* url */)
            .then(()=>{
                    console.log("Success");
                },
                ()=>{
                    console.log("failed")
                })
    }


}
