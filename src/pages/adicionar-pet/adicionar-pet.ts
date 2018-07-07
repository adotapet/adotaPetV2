import {Component} from '@angular/core';
import {AlertController, LoadingController, Loading, NavController, ToastController} from 'ionic-angular';

import {Post} from "../../models/post";
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from 'angularfire2/database';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {storage, database} from "firebase";
import {AdotePage} from "../adote/adote";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";


@Component({
    selector: 'page-adicionar-pet',
    templateUrl: 'adicionar-pet.html'
})


export class AdicionarPetPage {

    post = {} as Post;
    photoUrls = [];
    fotoUrls: any[];
    especie = [];
    selectedRacas: any;
    selectedEspecie: any;
    rootPage: any;
    loading: Loading;
    canEnter: boolean;
    constructor(public navCtrl: NavController, private alert: AlertController,
                private camera: Camera, private afDatabase: AngularFireDatabase, private auth: AuthProvider,
                public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    }

    ionViewCanEnter() {
        this.auth.getUser().then(user => {
            let result = !!user;
            let toast = this.toastCtrl.create({
                message: 'Faça login para continuar',
                duration: 2000,
                position: 'bottom'
            });
            if (!result) {
                toast.present();
                this.canEnter = false;
            }else {
                this.canEnter = true;
            }
        })
    }

    onChange(newEspecie) {

        this.selectedEspecie = newEspecie;

        switch (newEspecie) {

            case "Canina":
                this.selectedRacas = [
                    "(SRD)",
                    "Afegão Hound",
                    "Affenpinscher",
                    "Airedale Terrier",
                    "Akita",
                    "American Staffordshire Terrier",
                    "Basenji",
                    "Basset Hound",
                    "Beagle",
                    "Bearded Collie",
                    "Bedlington Terrier",
                    "Bichon Frisé",
                    "Bloodhound",
                    "Bobtail",
                    "Boiadeiro Australiano",
                    "Boiadeiro Bernês",
                    "Border Collie",
                    "Border Terrier",
                    "Borzoi",
                    "Boston Terrier",
                    "Boxer",
                    "Buldogue",
                    "Bull Terrier",
                    "Bulmastife",
                    "Cairn Terrier",
                    "Cane Corso",
                    "Cão de Água Português",
                    "Cão de Crista Chinês",
                    "Cavalier King Charles Spaniel",
                    "Chesapeake Bay Retriever",
                    "Chihuahua",
                    "Chow Chow",
                    "Cocker Spaniel",
                    "Collie",
                    "Coton de Tuléar",
                    "Dachshund",
                    "Dálmata",
                    "Dandie Dinmont Terrier",
                    "Doberman",
                    "Dogo Argentino",
                    "Dogue Alemão",
                    "Fila Brasileiro",
                    "Fox Terrier (Pelo Duro e Pelo Liso)",
                    "Foxhound Inglês",
                    "Galgo",
                    "Golden Retriever",
                    "Grande Boiadeiro Suiço",
                    "Greyhound",
                    "Grifo da Bélgica",
                    "Husky Siberiano",
                    "Jack Russell Terrier",
                    "King Charles",
                    "Komondor",
                    "Labradoodle",
                    "Labrador",
                    "Lakeland Terrier",
                    "Leonberger",
                    "Lhasa Apso",
                    "Lulu da Pomerânia",
                    "Malamute do Alasca",
                    "Maltês",
                    "Mastife",
                    "Mastim",
                    "Norfolk Terrier",
                    "Norwich Terrier",
                    "Papillon",
                    "Pastor Alemão",
                    "Pastor Australiano",
                    "Pinscher Miniatura",
                    "Poodle",
                    "Pug",
                    "Rottweiler",
                    "ShihTzu",
                    "Silky Terrier",
                    "Skye Terrier",
                    "Staffordshire Bull Terrier",
                    "Terra Nova",
                    "Terrier Escocês",
                    "Tosa",
                    "Weimaraner",
                    "Welsh Corgi (Cardigan)",
                    "Welsh Corgi (Pembroke)",
                    "West Highland White Terrier",
                    "Whippet",
                    "Xoloitzcuintli",
                    "Yorkshire Terrier"
                ];
                break;

            case "Felina":
                this.selectedRacas = [
                    "(SRD)",
                    "Persa",
                    "Siamês",
                    "Himalaia",
                    "Maine Coon",
                    "Angorá",
                    "Siberiano",
                    "Sphynx",
                    "Burmese",
                    "Ragdoll",
                    "British Shorthair"
                ];
                break;
            case "Outros":
                this.selectedRacas = [
                    "Periquito",
                    "Papagaio",
                    "Cacatua",
                    "Canário",
                    "Calopsita",
                    "Coelho",
                    "Hamster"
                ];
                break;
        }

    };

    async takePhoto() {

        try {
            const options: CameraOptions = {
                quality: 90,
                targetWidth: 400,
                targetHeight: 400,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                saveToPhotoAlbum: true,
                allowEdit: true
            };


            this.camera.getPicture(options).then((imageData) => {
                console.log('getPicture');
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                let date = new Date().getTime();
                let image = {'date': date, 'img': base64Image};
                this.photoUrls.push(image);
                console.log(this.photoUrls)
            }, (err) => {
                let popup = this.alert.create({
                    title: 'Erro! :(',
                    subTitle: 'Não conseguimos encontrar a imagem, tente novamente. ',
                    buttons: ['Ok']
                });
                popup.present();
            });
        }
        catch (e) {
            console.error(e);
        }

    }

    async takeGallery() {

        try {
            const options: CameraOptions = {
                quality: 90,
                targetWidth: 400,
                targetHeight: 400,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                saveToPhotoAlbum: true,
                allowEdit: true
            };


            this.camera.getPicture(options).then((imageData) => {
                console.log('getPicture');
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                let date = new Date().getTime();
                let image = {'date': date, 'img': base64Image};
                this.photoUrls.push(image);
                console.log(this.photoUrls)
            }, (err) => {
                let popup = this.alert.create({
                    title: 'Erro! :(',
                    subTitle: 'Não conseguimos encontrar a imagem, tente novamente. ',
                    buttons: ['Ok']
                });
                popup.present();
            });
        }
        catch (e) {
            console.error(e);
        }

    }


    async addPost(post) {
        this.post.filtro = post.estado + '_' + post.especie;


        try {
            console.log('add post log 1');
            //Pegando uma key do database pra criar a pasta das fotos;
            let key = database().ref('BR/adocao/pets').push().key;
            let afDb = this.afDatabase;
            let auth = this.auth;
            let popup = this.alert.create({
                title: 'Pet Cadastrado com Sucesso :D',
                subTitle: 'Desejamos Boa Sorte!',
                buttons: [{
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        this.post = {} as Post;
                        this.navCtrl.push(AdotePage, null, {animation: 'md-transition'});
                    }
                }]
            });
            if (this.photoUrls[0]) {

                //Fazendo um loop inserindo as strings base64 das fotos e colocando no storage.
                this.getUrls(key, post).then(data => {
                    console.log('RETURNED', this.post);
                    auth.getUser().then(user => {
                        this.post.user = user.uid;
                    });
                    auth.getUserPerfil(this.post.user).on('value', data => {
                        this.post.coordenadas = data.val().location;
                        this.post.data = new Date().toLocaleDateString();

                    });
                    afDb.object(`BR/adocao/pets/${key}`).set(this.post).then(() => {
                            console.log('finished log 3', this.post);
                            this.presentWithGif();
                            setTimeout(() => {
                                this.loading.dismiss();
                                popup.present();
                            }, 4000);
                        }
                    );


                });

            } else {
                this.post = {} as Post;
                let popup = this.alert.create({
                    title: 'Você precisa colocar uma imagem!',
                    buttons: ['Ok']
                });
                popup.present();
                console.log(post)
            }

        } catch (e) {
            console.log(e);
        }

    }


    async getUrls(key, post: Post): Promise<any> {
        let i = 0;
        post.fotoUrls = [];

        for (let url of this.photoUrls) {
            let fileName = key + '_' + url.date;
            let imageRef = storage().ref('images/adocao/' + key + '/' + fileName);
            imageRef.putString(url.img, 'data_url').then(data => {
                post.fotoUrls[i] = 'https://firebasestorage.googleapis.com/v0/b/adotapet-dev.appspot.com/o/' + (data.metadata.fullPath).replace(/[/]/g, '%2f') + '?alt=media';
                console.log('DATAAAAA', post);
                i++;
                this.afDatabase.object('BR/adocao/pets/' + key).update(post);

                if (i == this.photoUrls.length) {
                    return post;
                }
            });

        }

        console.log('returned log 2', post);
    }

    presentWithGif() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
                         <div class="custom-spinner-container">
                             <img class="loading" width="120px" height="120px" src="assets/coghiLoading.gif" />
                         </div>`
        });
        this.loading.present();
    }

}
