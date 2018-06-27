import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AdotePage} from '../adote/adote';
import {PerfilPage} from '../perfil/perfil';
import {MeusPetsPage} from '../meus-pets/meus-pets';
import {ChatPage} from '../chat/chat';
import {MensagemPage} from '../mensagem/mensagem';
import {AdicionarPetPage} from '../adicionar-pet/adicionar-pet';
import {NearbyPetsPage} from "../nearby-pets/nearby-pets";
import {UserPerfilPage} from "../user-perfil/user-perfil";

@Component({
    selector: 'page-tabs-controller',
    templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

    tab1Root: any = AdotePage;
    tab2Root: any = AdicionarPetPage;
    tab3Root: any = UserPerfilPage;
    tab4Root: any = ChatPage;
    tab5Root: any = NearbyPetsPage;

    constructor(public navCtrl: NavController) {


    }


    goToAdote(params) {
        if (!params) params = {};
        this.navCtrl.push(AdotePage);
    }

    goToPerfil(params) {
        if (!params) params = {};
        this.navCtrl.push(PerfilPage);
    }

    goToUserPerfil(params) {
        if (!params) params = {};
        this.navCtrl.push(UserPerfilPage);
    }

    goToChat(params) {
        if (!params) params = {};
        this.navCtrl.push(ChatPage);
    }

    goToMensagem(params) {
        if (!params) params = {};
        this.navCtrl.push(MensagemPage);
    }
    goToMap(params) {
        if (!params) params = {};
        this.navCtrl.push(NearbyPetsPage);
    }
}
