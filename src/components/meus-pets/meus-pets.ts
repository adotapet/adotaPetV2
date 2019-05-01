import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage"
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
    this.db.list('adocao/pets', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
      this.myPets.ativos = data;
    });
    this.db.list('adocao/adotados', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
      this.myPets.adotados = data;
      console.log('PETS', this.myPets);
    });

  }

  async deletePet(id, pet) {

    const translationTitle: string = this.translate.instant('Você tem certeza que deseja excluir o pet?');
    const translationText: string = this.translate.instant('Tenho certeza');
    const translationNo: string = this.translate.instant('Não');

    let popup = this.alert.create({

      title: translationTitle,
      buttons: [{
        text: translationText,
        role: 'confirm',
        handler: async () => {
          try {
            await this.db.list('adocao/pets/' + id).remove();
            await this.db.list('adocao/chat/salas/', ref => ref.orderByChild('pet').equalTo(id)).remove();
            await this.db.list('adocao/chat/menssagens/', ref => ref.orderByChild('pet').equalTo(id)).remove();
            this.presentToast('Pet removido do aplicativo!');
          } catch (e) {
            this.presentToast('Erro ao remover o pet!');
          }
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
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
