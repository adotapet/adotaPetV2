import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Push } from '@ionic-native/push';

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html'
})
export class ChatRoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
  }

}
