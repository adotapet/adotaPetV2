import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {storage, database} from "firebase";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {NearbyPetsPage} from "../nearby-pets/nearby-pets";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";

@Component({
    selector: 'page-pets-perdidos',
    templateUrl: 'pets-perdidos.html',
})
export class PetsPerdidosPage {

    @ViewChild('map2') mapElement: ElementRef;
    @ViewChild('pleaseConnect2') pleaseConnect: ElementRef;

    pet = {"foto": '', "detalhes": '', "especie": '', "tipo": 0, "coordenadas": {}};
    tipo: number;
    private petFormGroup: FormGroup;
    private photoData: any;
    private photoUrl: string;
    private mapLoaded;

    constructor(public navCtrl: NavController, public navParams: NavParams, public afDb: AngularFireDatabase,
                public loadingCtrl: LoadingController, public alert: AlertController, private camera: Camera,
                private formBuilder: FormBuilder, public maps: GoogleMapsProvider, public platform: Platform) {
        console.log('tipo', this.navParams.get('tipo'));
        this.tipo = this.navParams.get('tipo');
        this.petFormGroup = this.formBuilder.group({
            photoUrl: ['', Validators.required],
            especie: ['', Validators.required],
            detalhes: ['', Validators.required],
            coordenadas: ['', Validators.required],
            tipo: ['', Validators.required]
        });
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            console.log('PLATAFORMA PRONTA');
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            Promise.all([
                mapLoaded
            ]).then((result) => {
                console.log('MAPA CARREGOU', result);
                this.maps.getClickedCoords(this.tipo).then(coords => {
                    this.pet.coordenadas = coords;
                });
            });
        });
    }

    addPetPerdido(pet) {
        console.log('add peeet');
        let loading = this.loadingCtrl.create({
            content: 'Cadastrando...'
        });
        loading.present();
        let key = database().ref('perdidos/pets/').push().key;
        this.getUrls(key).then(url => {
            this.pet.foto = url;
            this.pet.tipo = this.tipo;
            this.afDb.object('perdidos/pets/' + key).set(this.pet).then(() => {
                loading.dismiss();
                this.navCtrl.setRoot(NearbyPetsPage);
            });
        });
    }

    takePhoto() {
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
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
               let base64Image = 'data:image/jpeg;base64,' + imageData;
                let date = new Date().getTime();
                this.photoData = {"data": date, "img": base64Image};
                this.photoUrl = base64Image;
            }, (err) => {
                console.log('Erro',err);
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

    getUrls(key): Promise<any> {

        let fileName = key + '_' + this.photoData.data;
        let imageRef = storage().ref('images/perdidos/' + key + '/' + fileName);
        let promisse = new Promise(resolve => {
            imageRef.putString(this.photoData.img, 'data_url').then(data => {
                let url = 'https://firebasestorage.googleapis.com/v0/b/adotapet-dev.appspot.com/o/' + (data.metadata.fullPath).replace(/[/]/g, '%2f') + '?alt=media';
                resolve(url);
            });
        });
        return promisse;

    }
}
