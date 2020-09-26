// import {Component, OnInit} from '@angular/core';
// import {NavController, NavParams} from 'ionic-angular';
// import {MensagemPage} from '../../pages/mensagem/mensagem'
// import {ChatProvider} from "../../providers/chat/chat";
// import {AuthProvider} from "../../providers/auth/auth";

// @Component({
//   selector: 'salas-chat',
//   templateUrl: 'salas-chat.html'
// })
// export class SalasChatComponent {

//   notification = '';
//   error: any;
//   salasChat = [];

//   constructor(public navCtrl: NavController, public chat: ChatProvider, public auth: AuthProvider) {
//     this.auth.getUser().then(user => {
//       console.log('Meu id', user.uid);
//       this.chat.getSalas(user.uid).subscribe(data => {
//         this.salasChat = data;
//         console.log(data, 'Salas no meu nome');
//       });
//     });
//   }


//   goToMensagem(sala) {
//     if (!sala) sala = null;
//     this.navCtrl.push(MensagemPage, {
//       "key": sala.pet,
//       "idGrouped": sala.dono_interessado_pet,
//       "titulo": sala.nomePet,
//       "id_interessado": sala.id_interessado
//     });
//   }
// }
