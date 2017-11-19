import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import {AngularFireDatabase} from 'angularfire2/database'
import {Post} from "../../models/post";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {storage} from "firebase";


@Component({
  selector: 'page-adicionar-pet',
  templateUrl: 'adicionar-pet.html'
})


export class AdicionarPetPage {

  post = {} as Post;
  photoUrl: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController,
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

      // await this.camera.getPicture(options);
      // const image = 'data:image/jpeg;base64,${result}';
      // console.log(image);

      await this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photoUrl = base64Image;
      }, (err) => {
        // Handle error
      });
    }
    catch (e) {
      console.error(e);
    }

  }


  addPost() {
    try {
      this.afDatabase.list('BR/adocao/pets').push(this.post).then(res => {
        const picture = storage().ref('images/adocao/');
        picture.putString(this.photoUrl, 'data_url');
        console.log(res, 'pet cadastrado');
        let popup = this.alert.create({
          title: 'Pet Postado',
          subTitle: 'Boa sorte!',
          buttons: ['Dismiss']
        });
        popup.present();
      });
      this.navCtrl.push(TabsControllerPage);
    } catch (e) {
      console.log(e);
    }

  }

}
