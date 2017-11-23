import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {CadastrarPage} from '../pages/cadastrar/cadastrar';
import {AdicionarPetPage} from '../pages/adicionar-pet/adicionar-pet';
import {MeusPetsPage} from '../pages/meus-pets/meus-pets';
import {TabsControllerPage} from '../pages/tabs-controller/tabs-controller';
import {LoginPage} from '../pages/login/login';
import {ChatPage} from '../pages/chat/chat';
import {PerfilPage} from '../pages/perfil/perfil';
import {MensagemPage} from '../pages/mensagem/mensagem';
import {AdotePage} from "../pages/adote/adote";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginProvider} from '../providers/login/login';
import {PostProvider} from '../providers/post/post';
import {ChatProvider} from '../providers/chat/chat';

import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import { AngularFireDatabaseModule } from 'angularfire2/database'
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {Facebook} from "@ionic-native/facebook";
import {Camera} from "@ionic-native/camera";
import { Push } from '@ionic-native/push';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    CadastrarPage,
    AdicionarPetPage,
    MeusPetsPage,
    TabsControllerPage,
    LoginPage,
    ChatPage,
    PerfilPage,
    MensagemPage,
    AdotePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CadastrarPage,
    AdicionarPetPage,
    MeusPetsPage,
    TabsControllerPage,
    LoginPage,
    ChatPage,
    PerfilPage,
    MensagemPage,
    AdotePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    PostProvider,
    ChatProvider,
    Facebook,
    Camera,
    Push,
    GoogleAnalytics
  ]
})
export class AppModule {
}
