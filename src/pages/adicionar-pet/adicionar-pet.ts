import {Component} from '@angular/core';
import {AlertController, LoadingController, Loading, NavController, ToastController} from 'ionic-angular';

import {Post} from "../../models/post";
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from '@angular/fire/database';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationsProvider} from "../../providers/locations/locations";
import {AdotePage} from "../adote/adote";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";

@Component({
  selector: 'page-adicionar-pet',
  templateUrl: 'adicionar-pet.html'
})


export class AdicionarPetPage {

  post: FormGroup;
  photoData = [];
  fotoUrls: any[];
  especie = [];
  selectedRacas: any;
  selectedEspecie: any;
  rootPage: any;
  loading: Loading;
  showloader = false;
  canEnter: boolean;

  constructor(
    public navCtrl: NavController, private alert: AlertController,
    private camera: Camera, private afDatabase: AngularFireDatabase, private auth: AuthProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public formBuilder: FormBuilder,
    public locations: LocationsProvider, private storage: AngularFireStorage
  ) {
    this.post = this.formBuilder.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', Validators.required],
      sexo: ['', Validators.required],
      whatsapp: ['', Validators.required],
      informacoes: ['', Validators.required]
    });
  }

  ionViewCanEnter() {
    this.auth.getUser().then(user => {
      let result = !!user;
      let toast = this.toastCtrl.create({
        message: 'Faça login para continuar',
        duration: 1000,
        position: 'bottom'
      });
      if (!result) {
        toast.present();
        this.canEnter = false;
      } else {
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
        this.photoData.push(image);
        console.log(this.photoData)
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
        this.photoData.push(image);
        console.log(this.photoData)
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


  addPost() {
    try {
      console.log('add post log 1');
      let key = this.afDatabase.createPushId();

      let popup = this.alert.create({
        title: 'Pet Cadastrado com Sucesso :D',
        subTitle: 'Desejamos Boa Sorte!',
        buttons: [{
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.post.reset();
            this.photoData = [];
            this.fotoUrls = [];
            this.navCtrl.push(AdotePage, null, {animation: 'md-transition'});
          }
        }]
      });

      if (this.photoData[0]) {

        this.showloader = true;
        this.presentWithGif();

        this.auth.getUser().then(user => {
          this.post.value.user = user.uid;
          this.locations.getCurrentPosition().then(coordenadas => {
            console.log('log 3', coordenadas);
            this.post.value.coordenadas = coordenadas;
            this.post.value.data = new Date().toLocaleDateString();
            this.afDatabase.object(`adocao/pets/${key}`).set(this.post.value).then(() => {
                console.log('finished log 4', this.post.value);
                this.uploadImagesAndUpdatePet(key).then(msg => {
                  this.showloader = false;
                  this.loading.dismiss();
                  popup.present();
                }).catch(e => {
                  this.showloader = false;
                  this.loading.dismiss();
                });
              }
            );
          }).catch(e => {
            this.showloader = false;
            this.loading.dismiss();
          })
        }).catch(errorObject => {
          console.log(errorObject);
          this.showloader = false;
          this.loading.dismiss();
        });

      } else {
        let popup = this.alert.create({
          title: 'Você precisa colocar pelo menos uma imagem!',
          buttons: ['Ok']
        });
        popup.present();
      }

    } catch (e) {
      console.log(e);
    }

  }


  async uploadImagesAndUpdatePet(key): Promise<any> {
    let i = 0;
    this.fotoUrls = [];

    return new Promise((resolve, reject) => {

      for (let foto of this.photoData) {

        let fileName = key + '_' + foto.date;
        let filePath = `images/adocao/${key}/${fileName}`;
        const fileRef: AngularFireStorageReference = this.storage.ref(filePath);

        // Upando a imagem base64
        fileRef.putString(foto.img, 'data_url').then(data => {
          // Aguardando a url da foto ficar disponivel e colocala no array;
          fileRef.getDownloadURL().subscribe(url => {
            console.log('url', url);
            this.fotoUrls[i] = url;
          }, erro => reject(erro));
        }, error => reject(error));
        i++;
      }
      //END FOR
      this.afDatabase.object('adocao/pets/' + key).update({"fotoUrls": this.fotoUrls}).then(() => {
        console.log('fotoUrls atualizadas');
        resolve('fotoUrls atualizadas');
      }, error => reject(error));
    });
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

