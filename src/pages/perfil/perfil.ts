import {Component} from '@angular/core';
import {AlertController, LoadingController, Loading, NavController, NavParams, ToastController} from 'ionic-angular';
import {MensagemPage} from "../mensagem/mensagem";
import {AngularFireAuth} from "angularfire2/auth";
import {SocialSharing} from '@ionic-native/social-sharing';
import {AngularFireDatabase} from "angularfire2/database";


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
    loading: Loading;

    constructor(public navCtrl: NavController, public params: NavParams, private afAuth: AngularFireAuth,
                private socialSharing: SocialSharing, private db: AngularFireDatabase, private alert: AlertController,
                private toastCtrl: ToastController, public loadingCtrl: LoadingController) {

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

    presentWithGif() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
                         <div class="custom-spinner-container">
                             <img class="loading" width="200px" height="200px" src="../../assets/chibis-usagi-bow.gif" />
                         </div>`
        });
        this.loading.present();

        setTimeout(() => {
            this.loading.dismiss();
        }, 3000);


    }

    goToChat() {
        let key = this.key;
        let idGrouped = `${this.pet.user}_${this.usuarioAtual}_${key}`;
        console.log(key, this.pet.user);
        this.navCtrl.push(MensagemPage, {"key": key, "idGrouped": idGrouped});
    }

    marcarComoAdotado() {
        let popup = this.alert.create({
            title: 'Tem certeza que quer excluir o Pet?',
            subTitle: '',
            buttons: [{
                text: 'Sim',
                role: 'confirm',
                handler: () => {
                    this.presentWithGif();
                    this.presentToast();
                    //this.db.list('BR/adocao/pets/' + this.pet).remove().then(() => {
                    //
                    //});
                }
            },
                {
                    text: 'Nao',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        popup.present();
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: this.pet.nome + ' foi marcado como adotado!',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

    whatsappShare() {
        this.pet;
        console.log(this.pet.fotoUrls[0])

        this.socialSharing.shareViaWhatsApp("Olá,meu nome é " + this.pet.nome + " sou um(a) " + this.pet.especie + " da Raça " + this.pet.raca + " estou a procura de um dono! :D ", null /*Image*/, " Para me adotar bastar clicar nesse link abaixo e baixar o AdotaPet: " +
            " https://play.google.com/store/apps/details?id=com.labup.adotapet " + " Para ver minha foto acesse: " + this.pet.fotoUrls[0] /* url */)
            .then(() => {
                    console.log("Success");
                },
                () => {
                    console.log("failed")
                })
    }


}
