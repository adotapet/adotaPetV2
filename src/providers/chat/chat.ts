import {Injectable} from '@angular/core';
import {AuthProvider} from "../auth/auth";
import {PostProvider} from "../post/post";
import {AngularFireDatabase} from 'angularfire2/database';

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

    constructor(private auth: AuthProvider, public afDb: AngularFireDatabase, public postProvider: PostProvider) {
        console.log('Hello ChatProvider Provider');
        this.salasRef = afDb.database.ref('BR/chat/salas');
        this.msgRef = afDb.database.ref('BR/chat/menssagens');
        this.myInfo = this.auth.getUser();
    }

    async sendMessage(msg, petKey, idGrouped): Promise<any> {
        let salasRef = this.salasRef;
        let msgRef = this.msgRef;
        let myInfo = this.myInfo;
        let petsRef = await this.postProvider.getPetsRef();
        let petData;
        console.log(petsRef);
        this.afDb.database.ref(`${petsRef}/${petKey}`).once('value', (data) => {
            petData = data.val()
        });
        let Dono;
        this.auth.getUserPerfil(petData.user).subscribe(user => {
            Dono = user[0];

        });

        if (!petData && !petKey && !myInfo && !Dono && !msg) {
            return {error: 'Não foi possivel encontrar informações necessárias para enviar a mensagem. Tente novamente.'}
        }
        console.log(idGrouped, 'agrupados');
        console.log('iddddddddddddd', idGrouped);

        this.salasRef.orderByChild('dono_interessado_pet').equalTo(idGrouped).once('value', function (snap) {

            let sala = snap.val();
            let date = new Date().toLocaleString();
            if (sala == null) {
                let objSala = {
                    id_dono: petData.user,
                    nomeDono: Dono,
                    id_interessado: myInfo.uid,
                    nomeInteressado: (myInfo.displayName ? myInfo.displayName : myInfo.email),
                    pet: petKey,
                    nomePet: petData.nome,
                    //imagePet: petData.fotoUrls[0],
                    dono_interessado_pet: idGrouped
                };
                let objMsg = {
                    img: 'assets/img/IefaytxPTvmIeIUBCbFC_FarmafC3B3rmula-Pet.jpg',
                    content: msg,
                    senderName: (myInfo.displayName ? myInfo.displayName : myInfo.email),
                    time: date,
                    dono_interessado_pet: idGrouped,
                    autor: myInfo.uid
                };
                console.log('sala', objSala);
                console.log('msg', objMsg);

                salasRef.push(objSala);
                msgRef.push(objMsg);
            } else {
                let objMsg = {
                    img: 'assets/img/IefaytxPTvmIeIUBCbFC_FarmafC3B3rmula-Pet.jpg',
                    content: msg,
                    senderName: (myInfo.displayName ? myInfo.displayName : myInfo.email),
                    time: date,
                    dono_interessado_pet: idGrouped,
                    autor: myInfo.uid
                };
                console.log(date);
                msgRef.push(objMsg);
            }
            return;
        });
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
