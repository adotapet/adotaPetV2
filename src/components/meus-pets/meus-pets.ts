import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the MeusPetsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'meus-pets',
    templateUrl: 'meus-pets.html'
})
export class MeusPetsComponent {

    myPets = {"ativos": [], "adotados": []};
    myId: string;

    constructor(private db: AngularFireDatabase,
                public navCtrl: NavController,
                private authProvider: AuthProvider,
                private alert: AlertController,
                private toastCtrl: ToastController) {
        this.myId = this.authProvider.getUser().uid;
        this.listPets();
        console.log("Meus pets component");
    }


    async listPets() {
        this.db.list('BR/adocao/pets', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
            this.myPets.ativos = data;
            console.log('PETS', this.myPets);
        });
        this.db.list('BR/adocao/adotados', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
            this.myPets.adotados = data;
            console.log('PETS', this.myPets);
        });
    }

    deletePet(id, pet) {
        console.log('pet deleeete', pet);

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

}
