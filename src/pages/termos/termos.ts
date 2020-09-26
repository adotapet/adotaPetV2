import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-termos',
  templateUrl: 'termos.html',
})
export class TermosPage {
public data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = Date.now();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TermosPage');
  }

}
