import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireStorage} from "angularfire2/storage"
import {TranslateService} from "@ngx-translate/core";

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
                private storage: AngularFireStorage,
                private translate: TranslateService
    ) {

        this.authProvider.getUser().then(user => {
            this.myId = user.uid;
            if (user.uid) {
                this.listPets();
            }
        });

    }


    listPets() {
        console.log('log1');
        return new Promise(resolve => {
            this.db.list('adocao/pets', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
                this.myPets.ativos = data;
                this.db.list('adocao/adotados', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
                    this.myPets.adotados = data;
                    console.log('PETS', this.myPets);
                    resolve(this.myPets);
                });
            });
        });

    }

    deletePet(id, pet) {

        const translationTitle: string = this.translate.instant('Você tem certeza que deseja deletar?');
        const translationText: string = this.translate.instant('Tenho certeza');
        const translationNo: string = this.translate.instant('Não');

        let popup = this.alert.create({

            title: translationTitle,
            buttons: [{
                text: translationText,
                role: 'confirm',
                handler: () => {
                    this.db.list('adocao/pets/' + id).remove().then(() => {
                        this.db.list('adocao/chat/salas/', ref => ref.orderByChild('pet').equalTo(id)).remove();
                        this.db.list('adocao/chat/menssagens/', ref => ref.orderByChild('pet').equalTo(id)).remove();
                        this.storage.ref('images/adocao/' + id).delete().subscribe(() => {
                            this.presentToast('Pet removido do aplicativo!');
                        });

                    }).catch(erro => {
                        this.presentToast('An error has occurred. Try Again');
                    });

                }
            },
                {
                    text: translationNo,
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        popup.present();
    }

    marcarComoAdotado(id, pet) {
        const translationTitle: string = this.translate.instant('Tem certeza que quer marcar o Pet como adotado?');
        const translationText: string = this.translate.instant('Tenho certeza');
        const translationNo: string = this.translate.instant('Não');

        let popup = this.alert.create({
            title: translationTitle,
            buttons: [{
                text: translationText,
                role: 'confirm',
                handler: () => {
                    this.db.object('adocao/adotados/' + id).set(pet).then(() => {
                        this.db.list('adocao/pets/' + id).remove().then(() => {
                            this.presentToast(pet.nome);
                        });
                    });

                }
            },
                {
                    text: translationNo,
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        popup.present();

    }

    marcarComoAtivo(id, pet) {
        const translationTitle: string = this.translate.instant('Você deseja colocar o pet em adoção novamente?');
        const translationText: string = this.translate.instant('Tenho certeza');
        const translationNo: string = this.translate.instant('Não');
        const translationBack: string = this.translate.instant('voltou para a adoção!');


        let popup = this.alert.create({
            title: translationTitle,
            buttons: [{
                text: translationText,
                role: 'confirm',
                handler: () => {
                    this.db.object('adocao/pets/' + id).set(pet).then(() => {
                        this.db.list('adocao/adotados/' + id).remove().then(() => {
                            this.presentToast(pet.nome + translationBack);
                        });
                    });

                }
            },
                {
                    text: translationNo,
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
