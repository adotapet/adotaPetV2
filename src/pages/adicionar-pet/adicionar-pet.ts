import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {Post} from "../../models/post";
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from 'angularfire2/database';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {storage, database} from "firebase";
import {AdotePage} from "../adote/adote";



@Component({
    selector: 'page-adicionar-pet',
    templateUrl: 'adicionar-pet.html'
})


export class AdicionarPetPage {

    post = {} as Post;
    photoUrls = [];
    fotoUrls: any[];
    uploadUrls = {};
    especie = [];
    selectedRacas: any;
    selectedEspecie: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController,
                private camera: Camera, private afDatabase: AngularFireDatabase, private auth: AuthProvider,
               ) {

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

            try {
                console.log('add post log 1');
                //Pegando uma key do database pra criar a pasta das fotos;
                let key = database().ref('BR/adocao/pets').push().key;


                //let ref = this.afDatabase.object(`BR/adocao/pets/${key}`);
                if (this.photoUrls[0]) {
                    //Fazendo um loop inserindo as strings base64 das fotos e colocando no storage.
                    this.getUrls(key, post).then(post => {
                       this.post = post.fotoUrls;
                    });
                    this.post.user = this.auth.getUser().uid;

                    console.log('post final log 4', post);
                    this.afDatabase.object(`BR/adocao/pets/${key}`).set(post).then(()=>
                        console.log('finished log 5', post));
                    let popup = this.alert.create({
                        title: 'Pet em Adoção :D',
                        subTitle: 'Esperamos que ele encontre um dono rápido, Boa sorte!',
                        buttons: ['Ok']
                    });
                    popup.present();

                    this.post = {} as Post;
                    this.navCtrl.push(AdotePage);
                } else {
                    this.post = {} as Post;
                    let popup = this.alert.create({
                        title: 'Você precisa colocar uma foto do pet!',
                        buttons: ['Ok']
                    });
                    popup.present();
                }

            } catch (e) {
                console.log(e);
            }

    }


    async getUrls(key, post: Post): Promise<any> {
        let i = 0;
        post.fotoUrls =[];

        for (let url of this.photoUrls) {
            let fileName = key + '_' + url.date;
            let imageRef = storage().ref(`images/adocao/${key}/${fileName}`);
            imageRef.putString(url.img, 'data_url').then(data => {
                post.fotoUrls[i] = data.downloadURL;
                i++;
                this.afDatabase.object(`BR/adocao/pets/${key}`).set(post)
                if(i == this.photoUrls.length){

                    return post;
                }
            });
        }
        console.log('returned log 2', post);
    }

}
