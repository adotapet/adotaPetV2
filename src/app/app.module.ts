import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginProvider} from '../providers/login/login';
import {PostProvider} from '../providers/post/post';
import {ChatProvider} from '../providers/chat/chat';


import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {AngularFireStorageModule} from "@angular/fire/storage";
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {Facebook} from "@ionic-native/facebook";
import {Camera} from "@ionic-native/camera";

import {AuthProvider} from "../providers/auth/auth";
import {OneSignal} from "@ionic-native/onesignal";
import {SocialSharing} from "@ionic-native/social-sharing";
import {EmojiProvider} from "../providers/emoji";
import {LocationsProvider} from '../providers/locations/locations';
import {Geolocation} from '@ionic-native/geolocation';

//import {AndroidPermissions} from "@ionic-native/android-permissions";

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ProfilePage} from "../pages/profile/profile";
import {AdotePage} from "../pages/adote/adote";
import {AdicionarPetPage} from "../pages/adicionar-pet/adicionar-pet";
import {CadastrarPage} from "../pages/cadastrar/cadastrar";
import {LoginPage} from "../pages/login/login";
import {MensagemPage} from "../pages/mensagem/mensagem";
import {PerfilPage} from "../pages/perfil/perfil";
import {UserPerfilPage} from "../pages/user-perfil/user-perfil";
import {ComponentsModule} from "../components/components.module";
import {TabsControllerPage} from "../pages/tabs-controller/tabs-controller";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    AdotePage,
    AdicionarPetPage,
    CadastrarPage,
    LoginPage,
    MensagemPage,
    PerfilPage,
    UserPerfilPage,
    ProfilePage,
    TabsControllerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ComponentsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdotePage,
    AdicionarPetPage,
    CadastrarPage,
    LoginPage,
    MensagemPage,
    PerfilPage,
    UserPerfilPage,
    ProfilePage,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    LoginProvider,
    AuthProvider,
    PostProvider,
    ChatProvider,
    Facebook,
    OneSignal,
    SocialSharing,
    EmojiProvider,
    Geolocation,
    LocationsProvider,
    // AndroidPermissions
  ]
})
export class AppModule {
}
