import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

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
import {OneSignal} from "@ionic-native/onesignal";
import {SocialSharing} from "@ionic-native/social-sharing";
import {EmojiProvider} from "../providers/emoji";
import {ConnectivityProvider} from '../providers/connectivity/connectivity';
import {GoogleMapsProvider} from '../providers/google-maps/google-maps';
import {LocationsProvider} from '../providers/locations/locations';
import {Network} from '@ionic-native/network';
import {Geolocation} from '@ionic-native/geolocation';
import {AngularFireStorageModule} from "angularfire2/storage";

import {AndroidPermissions} from "@ionic-native/android-permissions";

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ProfilePage} from "../pages/profile/profile";
import {NearbyPetsPage} from "../pages/nearby-pets/nearby-pets";
import {DatePipe} from "@angular/common";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


@NgModule({
    declarations: [
        MyApp,
        ProfilePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            preload: true
        }),
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
        ProfilePage
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
        Network,
        Geolocation,
        ConnectivityProvider,
        GoogleMapsProvider,
        LocationsProvider,
        AndroidPermissions,
        DatePipe
    ]
})
export class AppModule {
}
