// import {Injectable} from '@angular/core';
// import {AuthProvider} from "../auth/auth";
// import {HttpClient} from "@angular/common/http";
// import {OneSignal} from "@ionic-native/onesignal";
// import {AngularFirestore} from "@angular/fire/firestore";
// import {firestore} from "firebase/app";
// import {map} from "rxjs/operators";
// import {Observable} from "rxjs";


// @Injectable()
// export class ChatProvider {

//   ONESIGNAL_API: string = 'https://onesignal.com/api/v1/notifications';
//   userLogado: any = {};

//   constructor(public auth: AuthProvider, public afDb: AngularFirestore, private http: HttpClient, private oneSignal: OneSignal) {
//     this.auth.getUserLogadoPerfil().subscribe(user => {
//       this.userLogado = user;
//     })
//   }

//   getSalas(idUsuario): Observable<any> {
//     return this.afDb.collection('chats', ref => {
//       let query: firestore.CollectionReference | firestore.Query = ref;
//       if (idUsuario) {
//         query = query.where('idUsuario', '==', idUsuario)
//       }
//       return query;
//     }).snapshotChanges()
//       .pipe(
//         map(data => data.map((d: any) => {
//           return {id: d.payload.doc.id, ...d.payload.doc.data()}
//         }))
//       );
//   }

//   getMensagens(idSala): Observable<any> {
//     if (!idSala) idSala = 'semSala';
//     return this.afDb.collection<any>('chats')
//       .doc(idSala)
//       .snapshotChanges()
//       .pipe(
//         map((sala: any) => {
//           console.log(sala);
//           return {id: sala.payload.id, ...sala.payload.data()};
//         })
//       )
//   }

//   async criarSala(petData) {
//     this.auth.getUserLogadoPerfil().subscribe(user => {
//       this.auth.getUserId(petData.user).subscribe(async (dono) => {
//         const data = {
//           usuarioId: JSON.parse(localStorage.getItem('usuarioId')),
//           usuarioNome: user.nome || 'Anônimo',
//           idDonoPet: petData.user,
//           donoNome: dono.nome || 'Dono do pet',
//           createdAt: Date.now(),
//           updatedAt: Date.now(),
//           ultimaMensagem: '',
//           mensagens: []
//         };
//         console.log('dados sala', data, petData);
//         if (petData.key) {
//           let docRef = await this.afDb.collection('chats').add(data);
//           console.log('docRef', docRef);
//           return docRef;
//         }
//       })
//     });
//   }

//   async enviarMensagem(idSala, petData, myId, msg: string) {
//     if (!idSala) {
//       let sala: any = await this.criarSala(petData);
//       idSala = sala.id;
//     }
//     let nomeAutor = this.userLogado.nome || 'Anônimo';
//     const data = {
//       autor: myId,
//       autorNome: nomeAutor,
//       content: msg,
//       createdAt: Date.now()
//     };
//     console.log('Msg data', data, idSala);
//     if (myId && idSala && msg) {
//       return new Promise(async (resolve, reject) => {
//         try {
//           await this.afDb.collection('chats').doc(idSala).update({
//             mensagens: firestore.FieldValue.arrayUnion(data)
//           });
//           await this.afDb.doc('chats/' + idSala).update({'ultimaMensagem': data.content, 'updatedAt': Date.now()});
//           resolve(idSala);
//         } catch (e) {
//           reject(e);
//         }
//       })
//     }
//   }

//   oneSignall() {
//     // let notMsg: any = {
//     //   "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
//     //   "data": {
//     //     "sala": objMsg1.dono_interessado_pet,
//     //     "pet": objMsg1.pet,
//     //     'titulo': this.petData.nome,
//     //     "id_interessado": id_interessado
//     //   },
//     //   "contents": {"en": objMsg1.content, "pt": objMsg1.content},
//     //   "include_player_ids": [`${notToken}`]
//     // };
//     // console.log('obj', notMsg);
//     // this.http.post(this.onesignal_api, notMsg).subscribe((retorno) => {
//     //   console.log('RETORNO API', retorno);
//     //   resolve(retorno);

//     // }, error => {
//     //   console.log('RETORNO API ERRO', error);
//     //   reject(error);
//     // });
//   }
// }
