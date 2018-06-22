
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

    constructor(private auth: AuthProvider, public afDb: AngularFireDatabase, public postProvider: PostProvider, public oneSignal: OneSignal) {
        console.log('Hello ChatProvider Provider');
        this.salasRef = afDb.database.ref('BR/chat/salas');
        this.msgRef = afDb.database.ref('BR/chat/menssagens');
        this.myInfo = this.auth.getUser();
    }

    sendMessage(msg, petKey, idGrouped) {
        let salasRef = this.salasRef;
        let msgRef = this.msgRef;
        let myInfo = this.myInfo;
        let petsRef = this.postProvider.getPetsRef();
        let petData;
        let dono;
        let signal = this.oneSignal;
        this.afDb.database.ref(petsRef + "/" + petKey).once('value', data => {
            petData = data.val();
            console.log('PETDATA',petData);

        });
        this.auth.getUserPerfil(petData.user).on('value', user => {
            dono = user.val();
            console.log(user.val(), 'log dono');
        });

        if (!petData && !petKey && !myInfo && !dono && !msg) {
            return {error: 'Não foi possivel encontrar informações necessárias para enviar a mensagem. Tente novamente.'}
        }

        this.salasRef.orderByChild('dono_interessado_pet').equalTo(idGrouped).once('value', function (snap) {

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
                    token: dono.notificationToken,
                    dono: petData.user,
                    pet: petKey
                };
                salasRef.push(objSala);
                msgRef.push(objMsg);
            } else {
                let objMsg = {
                    img: 'assets/img/IefaytxPTvmIeIUBCbFC_FarmafC3B3rmula-Pet.jpg',
                    content: msg,
                    senderName: (myInfo.displayName ? myInfo.displayName : myInfo.email),
                    time: date,
                    dono_interessado_pet: idGrouped,
                    autor: myInfo.uid,
                    token: dono.notificationToken,
                    dono: petData.user,
                    pet: petKey
                };
                msgRef.push(objMsg);
                let token = dono.notificationToken;
                let notMsg:any = {
                    "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                    "data": {"sala": objMsg.dono_interessado_pet, "pet": objMsg.pet},
                    "contents": {"en": objMsg.content, "pt": objMsg.content},
                    "include_player_ids": [`${token}`]
                };
                console.log('obj',notMsg);
                signal.postNotification(notMsg).then(data => {
                    alert('notificacao enviada');
                });
            }
        });
        return;
    }


    getMenssagens(key) {
        console.log('getMessages service');
        return this.afDb.list('BR/chat/menssagens', ref => ref.orderByChild('dono_interessado_pet').equalTo(key)).valueChanges();
    }

    getConversasEnviadas() {
        return this.afDb.list('BR/chat/salas', ref => ref.orderByChild('id_interessado').equalTo(this.myInfo.uid)).valueChanges();

    }

    getConversasRecebidas() {
        return this.afDb.list('BR/chat/salas', ref => ref.orderByChild('id_dono').equalTo(this.myInfo.uid)).valueChanges();

    }

}