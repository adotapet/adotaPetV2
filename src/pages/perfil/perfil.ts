import { Component } from "@angular/core";
import {
  Loading,
  NavController,
  NavParams,
  AlertController,
  ToastController,
  ActionSheetController,
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { SocialSharing } from "@ionic-native/social-sharing";
import { AngularFireDatabase } from "@angular/fire/database";
import { PostProvider } from "../../providers/post/post";
import { Post } from "../../models/post";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-perfil",
  templateUrl: "perfil.html",
})
export class PerfilPage {
  count: number = 0;
  pet: Post;
  pet2: Post;
  dono: any;
  usuarioAtual: any = false;
  donoDaPostagem: boolean;
  loading: Loading;
  bgImg: any;
  resource: any;
  reports: number = 0;
  load = false;
  linkplaystore = 'https://play.google.com/store/apps/details?id=com.labup.adotapetv2&hl=pt_BR';
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private socialSharing: SocialSharing,
    private postProvider: PostProvider,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheet: ActionSheetController,
    private http: HttpClient
  ) {
    this.pet = params.get("pet") ? params.get("pet") : {};
  }

  async ionViewDidLoad() {
    this.checkUser();
    this.reports = this.pet.reports;
    setTimeout(() => {
      this.load = true;
    }, 1300);
    this.afDatabase
      .object(`adocao/pets/${this.pet.key}`)
      .valueChanges()
      .subscribe(
        (res: Post) => {
          // console.table(res);
          this.pet2 = res;
        },
        (error) => console.log(error)
      );
    // console.log("Reportes: ", this.reports);
    this.load = false;
  }

  async checkUser(): Promise<void> {
    this.afDatabase
      .object(`profile/${this.pet.user}`)
      .valueChanges()
      .subscribe((dono: any) => {
        dono ? (this.dono = dono.nome) : false;
        // if(dono){      this.dono = dono.nome;    }
      });
    this.afAuth.authState.subscribe((data) => {
      // console.log("auth state", data);
      if (data && data.email && data.uid) {
        this.usuarioAtual = data.uid;
        if (this.usuarioAtual == this.pet.user) {
          this.donoDaPostagem = true;
          console.log(this.donoDaPostagem);
        } else {
          this.donoDaPostagem = false;
          console.log(this.usuarioAtual);
        }
      } else {
        this.usuarioAtual = false;
        console.log("nao logado", this.usuarioAtual);
      }
    });
  }
  backgroundImg() {
    try {
      this.bgImg = this.resource.dynamicImage;
    } catch (e) {
      if (e.name === "ReferenceError") {
        console.log("var is undeclared");
      }
      this.bgImg = "../../assets/imgs/defaultImg.jpg";
    }

    return this.bgImg;
  }

  whatsappShare() {
    this.postProvider.shorUrl(this.pet.fotoUrls[0]).subscribe((url) => {
      console.log(url);
      this.socialSharing
        .shareViaWhatsApp(
          `Olá, meu nome é ${this.pet.nome} e estou a procura de um dono! :D `,
          null /*Image*/,
          " Para me adotar bastar clicar nesse link abaixo e baixar o AdotaPet GO: " +
          this.linkplaystore +
          " Para ver minha foto acesse: " +
          url.shortLink
        )
        .then(
          () => {
            console.log("Success");
          },
          () => {
            console.log("failed");
          }
        );
    });
  }
  whatsappSend(number: string, petname: string) {
    window.open(
      `https://api.whatsapp.com/send?phone=55${number}&text=Ol%C3%A1%2C%20queria%20saber%20mais%20informa%C3%A7%C3%B5es%20deste%20Pet%21%20${petname}`
    );
  }
  async reportAbuse() {
    if (!this.pet.reports || this.pet.reports === undefined) {
      const translationReportSuccess: string = this.translate.instant(
        "REPORT_SUCCESSFULLY"
      );
      const translationReporting: string = this.translate.instant("REPORTING");

      const popup = await this.alertCtrl.create({
        message: translationReporting,
      });
      popup.present();

      try {
        await this.afDatabase
          .object(`adocao/pets/${this.pet.key}`)
          .update({ reports: 1 })
          .then(async () => {
            console.log("PEt Update...");
            popup.dismiss();

            setTimeout(async () => {
              await this.navCtrl.pop();
              const toast = await this.toastCtrl.create({
                message: `${this.pet.nome} ${translationReportSuccess}.`,
                duration: 3000,
              });

              toast.present();
            }, 500);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setReport();
    }
  }
  async setReport() {
    const translationReportSuccess: string = this.translate.instant(
      "REPORT_SUCCESSFULLY"
    );
    const translationReporting: string = this.translate.instant("REPORTING");

    if (this.reports < 3) {
      let count: number = this.reports + 1;
      const popup = await this.alertCtrl.create({
        message: translationReporting,
      });
      popup.present();
      await this.afDatabase
        .object(`adocao/pets/${this.pet.key}`)
        .update({ reports: count });
      console.log("Setando + 1");

      setTimeout(async () => {
        await this.navCtrl.pop();
        const toast = await this.toastCtrl.create({
          message: `${this.pet.nome} ${translationReportSuccess}.`,
          duration: 3000,
        });

        toast.present();
      }, 500);
      popup.dismiss();
    } else if (this.reports === 3) {
      this.afDatabase
        .list(`adocao/pets/${this.pet.key}`)
        .remove()
        .then(async () => {
          console.log("Removido");
          await this.navCtrl.pop();
        })
        .catch((e) => console.log(e));
    }
  }
  async shared(): Promise<any> {
    const actionsheet = this.actionSheet.create({
      title: "AdotaPet",
      enableBackdropDismiss: true,
      buttons: [
        {
          text: "Instagram Direct",
          icon: "logo-instagram",
          handler: () => {
            return this.instagramShared();
          },
        },

        {
          text: "Whatsapp",
          icon: "logo-whatsapp",
          handler: () => {
            return this.whatsappShare();
          },
        },
        {
          text: "Compartilhe",
          icon: "share",
          handler: () => {
            return this.shareding();
          },
        },
        {
          text: "Cancelar",
          icon: "cancel",
          role: "cancel",
        },
      ],
    });
    actionsheet.present();
  }

  async instagramShared() {
    try {
      let message = `Olá, meu nome é ${this.pet.nome} e estou a procura de um dono! :D
        Para me adotar bastar clicar nesse link abaixo e baixar o AdotaPet GO: https://play.google.com/store/apps/details?id=com.labup.adotapetv2`;

      this.postProvider.shorUrl(this.pet.fotoUrls[0]).subscribe(async (url) => {
        let image = url.shortLink;
        await this.socialSharing.shareViaInstagram(message, image).then(
          () => {
            console.log("Success");
          },
          (e) => {
            console.log("failed InstagramShared > ", e);
          }
        );
      });
    } catch (error) { }
  }

  async shareding() {
    await this.postProvider.shorUrl(this.pet.fotoUrls[0]).subscribe(async (url) => {
      let image = await url.shortLink;

      let message = `Olá, meu nome é ${this.pet.nome} e estou a procura de um dono! :D
      Para me adotar bastar clicar nesse link abaixo e baixar o AdotaPet GO: https://play.google.com/store/apps/details?id=com.labup.adotapetv2`;


      await this.socialSharing.share(message, "", "", image).then(() => {
        console.log("Success");
      },
        (e) => {
          console.log("failed Shareding ", e);
        });

    });
  }

  favorite(): void { }
  back(): void {
    this.navCtrl.pop();
  }
}
