import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NearbyPetsPage} from "../nearby-pets/nearby-pets";


@IonicPage({
    priority:'high'
})
@Component({
    selector: 'page-tabs-controller',
    templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

    tab1Root: any = 'AdotePage';
    tab2Root: any = 'AdicionarPetPage';
    tab3Root: any = 'UserPerfilPage';
    //tab4Root: any = NearbyPetsPage;

    constructor(public navCtrl: NavController) {


    }


    goToAdote(params) {
        if (!params) params = {};
        this.navCtrl.push('AdotePage');
    }

    goToPerfil(params) {
        if (!params) params = {};
        this.navCtrl.push('PerfilPage');
    }

    goToUserPerfil(params) {
        if (!params) params = {};
        this.navCtrl.push('UserPerfilPage');
    }

    goToChat(params) {
        if (!params) params = {};
        this.navCtrl.push('ChatPage');
    }

    goToMensagem(params) {
        if (!params) params = {};
        this.navCtrl.push('MensagemPage');
    }
    goToMap(params) {
        if (!params) params = {};
        this.navCtrl.push('NearbyPetsPage');
    }
}
