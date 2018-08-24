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
import {AngularFireDatabaseModule} from 'angularfire2/database'
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {Facebook} from "@ionic-native/facebook";
import {Camera} from "@ionic-native/camera";

import {AuthProvider} from "../providers/auth/auth";
import {ProfilePage} from "../pages/profile/profile";
import {OneSignal} from "@ionic-native/onesignal";
import {SocialSharing} from "@ionic-native/social-sharing";
import {EmojiProvider} from "../providers/emoji";
import {EmojiPickerComponent} from "../components/emoji-picker/emoji-picker";
import {MeusPetsComponent} from "../components/meus-pets/meus-pets";
import {SalasChatComponent} from "../components/salas-chat/salas-chat";
import {ConnectivityProvider} from '../providers/connectivity/connectivity';
import {GoogleMapsProvider} from '../providers/google-maps/google-maps';
import {LocationsProvider} from '../providers/locations/locations';
import {NearbyPetsPage} from "../pages/nearby-pets/nearby-pets";
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import {UserPerfilPage} from "../pages/user-perfil/user-perfil";
import {AngularFireStorageModule} from "angularfire2/storage";
import {PleaseLoginComponent} from "../components/please-login/please-login";

import {AndroidPermissions} from "@ionic-native/android-permissions";

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


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
        AdotePage,
        ProfilePage,
        NearbyPetsPage,
        UserPerfilPage,
        MeusPetsComponent,
        SalasChatComponent,
        EmojiPickerComponent,
        PleaseLoginComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFireAuthModule,

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
        CadastrarPage,
        AdicionarPetPage,
        MeusPetsPage,
        TabsControllerPage,
        LoginPage,
        ChatPage,
        PerfilPage,
        MensagemPage,
        AdotePage,
        ProfilePage,

        UserPerfilPage,
        SalasChatComponent,
        MeusPetsComponent,
        NearbyPetsPage,
        PleaseLoginComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        LoginProvider,
        AuthProvider,
        PostProvider,
        ChatProvider,
        Facebook,
        Camera,
        OneSignal,
        SocialSharing,
        EmojiProvider,
        Network,
        Geolocation,
        ConnectivityProvider,
        GoogleMapsProvider,
        LocationsProvider,
        AndroidPermissions
    ]
})
export class AppModule {
}
