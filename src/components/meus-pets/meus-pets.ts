import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from "angularfire2/database";
;import {AngularFireStorage} from "angularfire2/storage"

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
                private toastCtrl: ToastController,
                private storage: AngularFireStorage) {
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
            title: 'Tem certeza que quer deletar o pet?',
            buttons: [{
                text: 'Tenho certeza',
                role: 'confirm',
                handler: () => {
                    this.db.list('BR/adocao/pets/' + id).remove().then(() => {
                        this.db.list('BR/adocao/chat/salas/', ref => ref.orderByChild('pet').equalTo(id)).remove();
                        this.db.list('BR/adocao/chat/menssagens/', ref => ref.orderByChild('pet').equalTo(id)).remove();
                        this.storage.ref('images/adocao/' + id).delete().subscribe(()=>{
                            this.presentToast('Pet removido do aplicativo!');
                        });

                    }).catch(erro =>{
                        this.presentToast('Ação não permitida');
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

    marcarComoAdotado(id, pet) {

        let popup = this.alert.create({
            title: 'Tem certeza que quer marcar o Pet como adotado?',
            buttons: [{
                text: 'Tenho certeza',
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

    marcarComoAtivo(id, pet) {

        let popup = this.alert.create({
            title: 'Você deseja colocar o pet em adoção novamente?',
            buttons: [{
                text: 'Tenho certeza',
                role: 'confirm',
                handler: () => {
                    this.db.object('BR/adocao/pets/' + id).set(pet).then(() => {
                        this.db.list('BR/adocao/adotados/' + id).remove().then(() => {
                            this.presentToast('O(a) ' + pet.nome + ' voltou para a adoção!');
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

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
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
