import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import {Post} from "../../models/post";
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from 'angularfire2/database';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {storage, database} from "firebase";

@Component({
    selector: 'page-adicionar-pet',
    templateUrl: 'adicionar-pet.html'
})


export class AdicionarPetPage {

    post = {} as Post;
    photoUrls = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController,
                private camera: Camera, private afDatabase: AngularFireDatabase, private auth: AuthProvider) {

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
                this.photoUrls.push(image);
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


    addPost(post) {
        try {
            console.log('add post');
            //Pegando uma key do database pra criar a pasta das fotos;
            let key = database().ref('BR/adocao/pets').push().key;
            let tmpUploadUrls = [];
            let uploadUrls = [];
            //Fazendo um loop inserindo as strings base64 das fotos e colocando no storage.
            this.photoUrls.forEach(function (item) {

                let fileName = key + '_' + item.date;
                let imageRef = storage().ref(`images/adocao/${key}/${fileName}`);
                imageRef.putString(item.img, 'data_url').then(data => {
                    uploadUrls.push(data.downloadURL);
                });
            });
            //coloca as urls das fotos upadas no objeto do pet;
            post.fotoUrls = uploadUrls;
            post.user = this.auth.getUser().uid;
            console.log(post);
            this.afDatabase.object(`BR/adocao/pets/${key}`).set(post).then(res => {
                console.log(res, 'pet cadastrado');
                let popup = this.alert.create({
                    title: 'Pet Postado',
                    subTitle: 'Boa sorte!',
                    buttons: ['Ok']
                });
                popup.present();
                post = {} as Post;
            });
            this.navCtrl.push(TabsControllerPage);
        } catch (e) {
            console.log(e);
        }

    }
}
