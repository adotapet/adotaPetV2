import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OneSignal} from "@ionic-native/onesignal";

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html'
})
export class ChatRoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private oneSignal: OneSignal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
  }


}
