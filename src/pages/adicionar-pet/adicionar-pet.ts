import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database'
import {Post} from "../../models/post";


@Component({
  selector: 'page-adicionar-pet',
  templateUrl: 'adicionar-pet.html'
})



export class AdicionarPetPage {

  post = { } as Post;



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private afDatabase: AngularFireDatabase
              ) {

  }



    addPost() {
        this.afDatabase.list('post/').push(this.post);
    }

}
