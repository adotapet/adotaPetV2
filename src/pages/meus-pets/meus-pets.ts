import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
    selector: 'page-meus-pets',
    templateUrl: 'meus-pets.html'
})
export class MeusPetsPage {

    myPets = [];

    constructor(public navCtrl: NavController, public auth: AuthProvider) {
    }

    ionViewDidLoad(){

    }


}
