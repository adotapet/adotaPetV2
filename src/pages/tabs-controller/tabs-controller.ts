import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AdotePage} from '../adote/adote';
import {PerfilPage} from '../perfil/perfil';
import {MeusPetsPage} from '../meus-pets/meus-pets';
import {ChatPage} from '../chat/chat';
import {MensagemPage} from '../mensagem/mensagem';
import {AdicionarPetPage} from '../adicionar-pet/adicionar-pet';
import {OneSignal} from "@ionic-native/onesignal";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'page-tabs-controller',
    templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

    tab1Root: any = AdotePage;
    tab2Root: any = AdicionarPetPage;
    tab3Root: any = MeusPetsPage;
    tab4Root: any = ChatPage;

    constructor(public navCtrl: NavController, public oneSignal: OneSignal, private afDb: AngularFireDatabase) {

       // this.oneSignal.handleNotificationReceived().subscribe(data => {
       //     // do something when notification is received
       //     alert(data);
       // });
//
       // this.oneSignal.handleNotificationOpened().subscribe(data => {
       //     // do something when a notification is opened
       //     this.navCtrl.push('ChatPage');
       // });

    }


    goToAdote(params) {
        if (!params) params = {};
        this.navCtrl.push(AdotePage);
    }

    goToPerfil(params) {
        if (!params) params = {};
        this.navCtrl.push(PerfilPage);
    }

    goToMeusPets(params) {
        if (!params) params = {};
        this.navCtrl.push(MeusPetsPage);
    }

    goToChat(params) {
        if (!params) params = {};
        this.navCtrl.push(ChatPage);
    }

    goToMensagem(params) {
        if (!params) params = {};
        this.navCtrl.push(MensagemPage);
    }
}
