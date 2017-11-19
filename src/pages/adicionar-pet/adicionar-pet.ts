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
  photoUrls = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController,
              private camera: Camera, private afDatabase: AngularFireDatabase) {
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
      };


      this.camera.getPicture(options).then((imageData) => {
        console.log('getPicture');
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photoUrls.push(base64Image);
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

        const picture = storage().ref(`images/adocao/${key}/`);
        let uploadTask = picture.putString(this.photoUrls[1], 'data_url');
        console.log('linkkk', uploadTask.snapshot.downloadURL);
        this.afDatabase.list('BR/adocao/pets/' + key + '/').set('imgUrl', uploadTask.snapshot.downloadURL);

        console.log(res, 'pet cadastrado');
        let popup = this.alert.create({
          title: 'Pet Postado',
          subTitle: 'Boa sorte!',
          buttons: ['Ok']
        });
        popup.present();
      });
      this.navCtrl.push(TabsControllerPage);
    } catch (e) {
      console.log(e);
    }

  }

}
