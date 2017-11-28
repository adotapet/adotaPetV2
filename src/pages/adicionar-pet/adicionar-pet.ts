import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import {AngularFireDatabase} from 'angularfire2/database'
import {Post} from "../../models/post";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {storage, database} from "firebase";

@Component({
    selector: 'page-adicionar-pet',
    templateUrl: 'adicionar-pet.html'
})


export class AdicionarPetPage {

    post = {} as Post;
    photoUrls = [];
    database: database.Database;

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
                let date = new Date().getTime();
                let image = {'date': date, 'img': base64Image};
                this.post.fotoUrl.push(image);
            }, (err) => {
                let popup = this.alert.create({
                    title: 'Erro!',
                    subTitle: 'Não conseguimos pegar a foto, tente novamente.',
                    buttons: ['Ok']
                });
                popup.present();
            });
        }
        catch (e) {
            console.error(e);
        }

    }


    addPost() {
        try {
            console.log('add post');
            let key = this.database.ref('BR/adocao/pets').push().key;
            let uploadUrls = [];
            this.photoUrls.forEach(function (item) {

                let fileName = key + '_' + item.date;
                let imageRef = storage().ref(`images/adocao/${key}/${fileName}`);
                imageRef.putString(item, 'data_url').then(data => {
                    console.log(data.downloadURL, 'image data');
                    uploadUrls.push(data.downloadURL);
                });
            });
            this.database.ref('BR/adocao/pets/' + key).set(this.post).then(res => {
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
