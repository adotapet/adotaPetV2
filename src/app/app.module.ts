import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { AdicionarPetPage } from '../pages/adicionar-pet/adicionar-pet';
import { MeusPetsPage } from '../pages/meus-pets/meus-pets';
import { AdotePage } from '../pages/adote/adote';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
import { PerfilPage } from '../pages/perfil/perfil';
import { MensagemPage } from '../pages/mensagem/mensagem';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CadastrarPage,
    AdicionarPetPage,
    MeusPetsPage,
    AdotePage,
    TabsControllerPage,
    LoginPage,
    ChatPage,
    PerfilPage,
    MensagemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CadastrarPage,
    AdicionarPetPage,
    MeusPetsPage,
    AdotePage,
    TabsControllerPage,
    LoginPage,
    ChatPage,
    PerfilPage,
    MensagemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}