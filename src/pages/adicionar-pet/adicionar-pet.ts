import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database'
import {Post} from "../../models/post";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {storage} from "firebase";


@Component({
  selector: 'page-adicionar-pet',
  templateUrl: 'adicionar-pet.html'
})



export class AdicionarPetPage {

    post = {} as Post;


    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
                private camera: Camera, private afDatabase: AngularFireDatabase) {
        console.log(this.post);
    }


    async takePhoto() {

        try {
            const options: CameraOptions = {
                quality: 50,
                targetWidth: 600,
                targetHeight: 600,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                correctOrientation: true
            }

        const result = await this.camera.getPicture(options);
        const image = 'data:image/jpeg;base64,${result}';
        const picture = storage().ref('images/adocao/');
        picture.putString(image, 'data_url');
        }
    catch (e) {
            console.error(e);
        }

    }





    addPost() {
        this.afDatabase.list('BR/adocao/pets').push(this.post);
    }

}
