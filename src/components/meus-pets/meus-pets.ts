import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'meus-pets',
    templateUrl: 'meus-pets.html'
})
export class MeusPetsComponent {

    myPets = {"ativos": [], "adotados": []};
    myId: string;
    searchParam: string;

    constructor(private db: AngularFireDatabase,
                public navCtrl: NavController,
                private authProvider: AuthProvider,
                private alert: AlertController,
                private toastCtrl: ToastController) {
        this.myId = this.authProvider.getUser().uid;
        this.listPets();
        console.log("Meus pets component");
    }


    listPets() {
        console.log('log1');
        return new Promise(resolve => {
            this.db.list('BR/adocao/pets', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
                this.myPets.ativos = data;
                console.log('PETS', this.myPets);
                this.db.list('BR/adocao/adotados', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
                    this.myPets.adotados = data;
                    console.log('PETS', this.myPets);
                    resolve(this.myPets);
                });
            });
        });

    }

    deletePet(id, pet) {

        let popup = this.alert.create({
            title: 'Tem certeza que quer marcar o Pet como adotado?',
            buttons: [{
                text: 'Sim',
                role: 'confirm',
                handler: () => {
                    this.db.object('BR/adocao/adotados/' + id).set(pet).then(() => {
                        this.db.list('BR/adocao/pets/' + id).remove().then(() => {
                            this.presentToast(pet.nome);
                        });
                    });

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

    presentToast(pet) {
        let toast = this.toastCtrl.create({
            message: 'O ' + pet + ' foi removido!',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

    onCancel(ev: any) {
        this.listPets();
    }

    onInput(ev: any) {
        const val = ev.target.value;

        this.listPets().then(data => {
            console.log('log2', data);

            if (val && val.trim() != '') {
                this.myPets.ativos = this.myPets.ativos.filter((item) => {
                    let nome = item.payload.val().nome;
                    let pet = (nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    if (pet) {
                        console.log(item);
                        return item;
                    }
                });
                this.myPets.adotados = this.myPets.adotados.filter((item) => {
                    let nome = item.payload.val().nome;
                    let pet = (nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    if (pet) {
                        console.log(item);
                        return item;
                    }

                });
            }

        });

    }

}
