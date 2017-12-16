import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from "../mensagem/mensagem";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  pet: any;
  key: string = 'aaaaaaaa';
  user:any;
  usuarioAtual :any;
  donoDaPostagem:boolean;


  constructor(public navCtrl: NavController,public params: NavParams, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.pet = params.get('pet');
    this.key = params.get('key');
    console.log(this.pet);





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
                    console.log(this.donoDaPostagem)
                }



            }
        });




    }
  goToChat(){
    let key = this.key;
    console.log(key);
    this.navCtrl.push(MensagemPage, {"key": key, "dono": this.pet.user});
  }







  
}
