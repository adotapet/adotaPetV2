import {Injectable} from '@angular/core';
import {AuthProvider} from "../auth/auth";
import {PostProvider} from "../post/post";
import {AngularFireDatabase} from 'angularfire2/database';
import {OneSignal} from "@ionic-native/onesignal";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

    salasRef: any;
    msgRef: any;
    myInfo: any;

    constructor(public auth: AuthProvider, public afDb: AngularFireDatabase, public postProvider: PostProvider, public oneSignal: OneSignal) {
        console.log('Hello ChatProvider Provider');
        this.salasRef = afDb.database.ref('chat/salas');
        this.msgRef = afDb.database.ref('chat/menssagens');
        this.auth.getUser().then(data => {
            this.myInfo = data;
        });
    }


    async sendMessage(msg, petKey, idGrouped, id_interessado) {
        let myInfo = this.myInfo;
        let salasRef = this.salasRef;
        let msgRef = this.msgRef;
        let petsRef = this.postProvider.getPetsRef();
        let petData;
        let dono;
        let signal = this.oneSignal;
        let myToken;
        let tokenInteressado;

        this.afDb.database.ref('profile/' + myInfo.uid + '/notificationToken').once('value', data => {
            myToken = data.val();
            console.log(myToken, 'myToken');
        });
        this.afDb.database.ref('profile/' + id_interessado + '/notificationToken').once('value', data => {
            tokenInteressado = data.val();
            console.log(tokenInteressado, 'myToken');
        });
        this.afDb.database.ref(petsRef + "/" + petKey).once('value', data => {
            petData = data.val();
            console.log('PETDATA', petData);
        });
        await this.auth.getUserPerfil(petData.user).on('value', user => {
            dono = user.val();
            console.log(user.val(), 'log dono');
        });

        if (!petData && !petKey && !myInfo && !dono && !msg) {
            return {error: 'Não foi possivel encontrar informações necessárias para enviar a mensagem. Tente novamente.'}
        }


        this.salasRef.orderByChild('dono_interessado_pet').equalTo(idGrouped).once('value', function (snap) {
            let notToken = (myToken == tokenInteressado) ? dono.notificationToken : tokenInteressado;
            console.log('TOKEN FINAL', notToken);
            let sala = snap.val();

            let date = new Date().toLocaleString();
            if (sala == null) {
                let objSala = {
                    id_dono: petData.user,
                    nomeDono: dono.name,
                    id_interessado: myInfo.uid,
                    nomeInteressado: (myInfo.displayName ? myInfo.displayName : myInfo.email),
                    pet: petKey,
                    nomePet: petData.nome,
                    imagePet: petData.fotoUrls[0],
                    dono_interessado_pet: idGrouped
                };
                let objMsg = {
                    img: 'assets/user.jpg',
                    content: msg,
                    senderName: (myInfo.displayName ? myInfo.displayName : myInfo.email),
                    time: date,
                    dono_interessado_pet: idGrouped,
                    autor: myInfo.uid,
                    token: myToken,
                    dono: petData.user,
                    pet: petKey
                };

                salasRef.push(objSala);
                msgRef.push(objMsg);
                let notMsg: any = {
                    "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                    "data": {
                        "sala": objMsg.dono_interessado_pet,
                        "pet": objMsg.pet,
                        'titulo': petData.nome,
                        "id_interessado": id_interessado
                    },
                    "contents": {"en": objMsg.content, "pt": objMsg.content},
                    "include_player_ids": [`${notToken}`]
                };
                console.log('obj', notMsg);
                signal.postNotification(notMsg);
            } else {
                let objMsg = {
                    img: 'assets/to-user.jpg',
                    content: msg,
                    senderName: (myInfo.displayName ? myInfo.displayName : myInfo.email),
                    time: date,
                    dono_interessado_pet: idGrouped,
                    autor: myInfo.uid,
                    token: myToken,
                    dono: petData.user,
                    pet: petKey
                };
                msgRef.push(objMsg);

                let notMsg: any = {
                    "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                    "data": {
                        "sala": objMsg.dono_interessado_pet,
                        "pet": objMsg.pet,
                        'titulo': petData.nome,
                        "id_interessado": id_interessado
                    },
                    "contents": {"en": objMsg.content, "pt": objMsg.content},
                    "include_player_ids": [`${notToken}`]
                };
                signal.postNotification(notMsg);
            }
        });
        return;
    }


    getMenssagens(key) {
        console.log('getMessages service');
        return this.afDb.list('chat/menssagens', ref => ref.orderByChild('dono_interessado_pet').equalTo(key)).valueChanges();
    }

    getConversasEnviadas(): Promise<any> {
        return new Promise(resolve => {
            this.auth.getUser().then(myInfo => {
                resolve(this.afDb.list('chat/salas', ref => ref.orderByChild('id_interessado').equalTo(myInfo.uid)).valueChanges());
            });
        });

    }

    getConversasRecebidas(): Promise<any> {
        return new Promise(resolve => {
            this.auth.getUser().then(myInfo => {
                resolve(this.afDb.list('chat/salas', ref => ref.orderByChild('id_dono').equalTo(myInfo.uid)).valueChanges());
            });
        });

    }

}