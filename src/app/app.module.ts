import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { DirectivesModule } from "../directives/directives.module";
import { AdMobFree } from '@ionic-native/admob-free';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginProvider } from "../providers/login/login";
import { PostProvider } from "../providers/post/post";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { Facebook } from "@ionic-native/facebook";
import { Camera } from "@ionic-native/camera";

import { AuthProvider } from "../providers/auth/auth";
import { OneSignal } from "@ionic-native/onesignal";
import { SocialSharing } from "@ionic-native/social-sharing";

import { LocationsProvider } from "../providers/locations/locations";
import { Geolocation } from "@ionic-native/geolocation";

import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ProfilePage } from "../pages/profile/profile";
import { AdotePage } from "../pages/adote/adote";
import { AdicionarPetPage } from "../pages/adicionar-pet/adicionar-pet";
import { CadastrarPage } from "../pages/cadastrar/cadastrar";
import { LoginPage } from "../pages/login/login";
import { PerfilPage } from "../pages/perfil/perfil";
import { UserPerfilPage } from "../pages/user-perfil/user-perfil";
import { ComponentsModule } from "../components/components.module";
import { TabsControllerPage } from "../pages/tabs-controller/tabs-controller";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrMaskerModule } from "brmasker-ionic-3";
import { AdmobProvider } from "../providers/admob/admob";


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
    // MensagemPage,
    PerfilPage,
    UserPerfilPage,
    ProfilePage,
    TabsControllerPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,
     {
      statusbarPadding: true
     } ),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ComponentsModule,
    HttpClientModule,
    DirectivesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrMaskerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdotePage,
    AdicionarPetPage,
    CadastrarPage,
    LoginPage,
    // MensagemPage,
    PerfilPage,
    UserPerfilPage,
    ProfilePage,
    TabsControllerPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    LoginProvider,
    AuthProvider,
    PostProvider,
    // ChatProvider,
    Facebook,
    OneSignal,
    SocialSharing,
    Geolocation,
    LocationsProvider,
    AdMobFree,
    AdmobProvider,

    // AndroidPermissions
  ],
})
export class AppModule {}
