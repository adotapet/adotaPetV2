import {Injectable} from '@angular/core';
import {AuthProvider} from "../auth/auth";
import {AngularFireDatabase} from 'angularfire2/database';
import {OneSignal} from "@ionic-native/onesignal";
import {Post} from "../../models/post";


@Injectable()
export class ChatProvider {

    salasRef = this.afDb.list('chat/salas');
    msgRef = this.afDb.list('chat/menssagens');
    myInfo: any = {};
    myToken: any;
    tokenInteressado: any;
    petData: any = {"user": 12321};
    dono: any;

    constructor(public auth: AuthProvider, public afDb: AngularFireDatabase, public oneSignal: OneSignal) {
        console.log('Hello ChatProvider Provider');
        this.auth.getUser().then(data => {
            this.myInfo = data;
        });
    }


    async sendMessage(msg, petKey, idGrouped, id_interessado): Promise<any> {

        //pegando o token do usuario local.
        let MytokenPromise = new Promise((resolve, reject) => {
            this.afDb.object('profile/' + this.myInfo.uid + '/pushToken').valueChanges().subscribe(token => {
                this.myToken = token;
                resolve(token);
                console.log('MYTOKEN', token);
            }, error => {
                reject("Nao foi possivel pegar o meu token");
                console.log("Nao foi possivel pegar o meu token")
            })
        });

        // pegando o token do dono do pet
        let interessadoTokePromise = new Promise((resolve, reject) => {
            this.afDb.object('profile/' + id_interessado + '/pushToken').valueChanges().subscribe(data => {
                this.tokenInteressado = data;
                console.log(this.tokenInteressado, 'TOKEN INTERESSADO');
                resolve(data);
            }, error1 => {
                console.log('Nao foi possivel pegar o token do interessado', error1);
                reject('Nao foi possivel pegar o token do interessado');
            });
        });

        let petDadaPromise = new Promise((resolve, reject) => {
            this.afDb.object('adocao/pets' + "/" + petKey).valueChanges().subscribe((pet: Post) => {
                this.petData = pet;
                console.log('PETDATA', this.petData);
                this.afDb.object('profile/' + pet.user).valueChanges().subscribe(user => {
                    this.dono = user;
                    console.log(user, 'PET DONO', user);
                    (user) ? resolve(user) : reject("NAO FOI POSSIVEL PEGAR O DONO DO PET");
                }, erro => {
                    reject('NAO FOI POSSIVEL PEGAR O DONO DO PET');
                });
            }, erro => {
                reject('NAO FOI POSSIVEL PEGAR OS DADOS DO PET');
            });
        });


        Promise.all([
            petDadaPromise,
            MytokenPromise,
            interessadoTokePromise
        ]).then(promises => {
            console.log(promises);
            return this.gravarDados(petKey, idGrouped, msg, id_interessado);
        });

        if (!this.petData && !petKey && !this.myInfo && !this.dono && !msg && !idGrouped) {
            return {error: 'Não foi possivel encontrar informações necessárias para enviar a mensagem. Tente novamente.'}
        }
    }

    gravarDados(petKey, idGrouped, msg, id_interessado): void {
        this.afDb.list('chat/salas', ref => ref.orderByChild('dono_interessado_pet').equalTo(idGrouped)).valueChanges().subscribe((sala) => {
            let notToken = (this.myToken == this.tokenInteressado) ? this.dono.pushToken : this.tokenInteressado;
            console.log('TOKEN FINAL', notToken);
            console.log('SALAAAA22222222', sala);

            let date = new Date().toLocaleString();
            if (!sala[0]) {
                let objSala = {
                    id_dono: this.petData.user,
                    nomeDono: (this.dono.nome ? this.dono.nome : 'Sem nome'),
                    id_interessado: this.myInfo.uid,
                    nomeInteressado: (this.myInfo.displayName ? this.myInfo.displayName : this.myInfo.email),
                    pet: petKey,
                    nomePet: this.petData.nome,
                    imagePet: this.petData.fotoUrls[0],
                    dono_interessado_pet: idGrouped
                };
                let objMsg = {
                    img: 'assets/user.jpg',
                    content: msg,
                    senderName: (this.myInfo.displayName ? this.myInfo.displayName : this.myInfo.email),
                    time: date,
                    dono_interessado_pet: idGrouped,
                    autor: this.myInfo.uid,
                    token: this.myToken,
                    dono: this.petData.user,
                    pet: petKey
                };

                this.salasRef.push(objSala).then(() => {
                    this.msgRef.push(objMsg).then(() => {
                        let notMsg: any = {
                            "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                            "data": {
                                "sala": objMsg.dono_interessado_pet,
                                "pet": objMsg.pet,
                                'titulo': this.petData.nome,
                                "id_interessado": id_interessado
                            },
                            "contents": {"en": objMsg.content, "pt": objMsg.content},
                            "include_player_ids": [`${notToken}`]
                        };
                        console.log('obj', notMsg);
                        this.oneSignal.postNotification(notMsg).then(() => {
                            console.log('NOTIFICAÇÃO ENVIADA');
                            return true
                        }).catch(erro => {
                            console.log('NOTIFICAÇÃO NAO ENVIADA');

                            return false;
                        });
                    });
                });

            } else {
                let objMsg = {
                    img: 'assets/to-user.jpg',
                    content: msg,
                    senderName: (this.myInfo.displayName ? this.myInfo.displayName : this.myInfo.email),
                    time: date,
                    dono_interessado_pet: idGrouped,
                    autor: this.myInfo.uid,
                    token: this.myToken,
                    dono: this.petData.user,
                    pet: petKey
                };
                this.msgRef.push(objMsg);

                let notMsg: any = {
                    "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                    "data": {
                        "sala": objMsg.dono_interessado_pet,
                        "pet": objMsg.pet,
                        'titulo': this.petData.nome,
                        "id_interessado": id_interessado
                    },
                    "contents": {"en": objMsg.content, "pt": objMsg.content},
                    "include_player_ids": [`${notToken}`]
                };
                this.oneSignal.postNotification(notMsg).then(() => {
                    console.log('NOTIFICAÇÃO ENVIADA');
                    return true
                }).catch(erro => {
                    console.log('NOTIFICAÇÃO NÃO ENVIADA');
                    return false;
                });
            }

        });
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