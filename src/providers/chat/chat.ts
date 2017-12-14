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

    async sendMessage(msg, petKey): Promise<any> {
        let salasRef = this.salasRef;
        let msgRef = this.msgRef;
        let myInfo = this.myInfo;
        let petsRef = await this.postProvider.getPetsRef();
        let petData;
        console.log(petsRef);
        this.afDb.database.ref(`${petsRef}/${petKey}`).once('value', (data) => {
            petData = data.val()
        });
        let nomeDono;
        this.auth.getUserPerfil(petData.user).once('value', function (user) {
            nomeDono = user.val().name;
        });
        if (!petData && !petKey && !myInfo && !nomeDono && !msg) {
            return {error: 'Não foi possivel encontrar informações necessárias para enviar a mensagem. Tente novamente.'}
        }
        let idGrouped = `${petData.user}_${myInfo.uid}_${petKey}`;
        console.log(idGrouped, 'agrupados');

        this.salasRef.orderByChild('dono_interessado_pet').equalTo(idGrouped).once('value', function (snap) {

            let sala = snap.val();
            if (sala == null) {
                let objSala = {
                    id_dono: petData.user,
                    nomeDono: nomeDono,
                    id_interessado: myInfo.uid,
                    nomeInteressado: myInfo.displayName,
                    pet: petKey,
                    nomePet: petData.nome,
                    //imagePet: petData.fotoUrls[0],
                    dono_interessado_pet: idGrouped
                };
                let objMsg = {
                    dono_interessado_pet: idGrouped,
                    autor: myInfo.uid,
                    msg: msg
                };
                console.log('sala', objSala);
                console.log('msg', objMsg);

                salasRef.push(objSala);
                msgRef.push(objMsg);
            } else {
                let objMsg = {
                    dono_interessado_pet: idGrouped,
                    autor: myInfo.uid,
                    msg: msg
                };
                msgRef.push(objMsg);
            }
            return;
        });
    }

    getMenssagens(key) {
        console.log(key);
        return this.afDb.list('BR/chat/menssagens/' + key).snapshotChanges();
    }

    getConversasEnviadas() {
        if (!this.myInfo.uid) {
            return {error: 'Não conseguimos encontrar o seu id. Tente logar novamente'}
        }
        return this.salasRef.orderByChild('id_interessado').equalTo(this.myInfo.uid);
    }

    getConversasRecebidas() {
        if (!this.myInfo.uid) {
            return {error: 'Não conseguimos encontrar o seu id. Tente logar novamente'}
        }
        return this.salasRef.orderByChild('id_dono').equalTo(this.myInfo.uid);
    }
}
