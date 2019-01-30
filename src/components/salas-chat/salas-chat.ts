import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from '../../pages/mensagem/mensagem'
import {ChatProvider} from "../../providers/chat/chat";

/**
 * Generated class for the SalasChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'salas-chat',
    templateUrl: 'salas-chat.html'
})
export class SalasChatComponent {

    notification = '';
    error: any;
    conversasEnviadas: any[];
    conversasRecebidas: any[];

    constructor(public navCtrl: NavController, public params: NavParams, public chat: ChatProvider) {
        this.chat.getConversasRecebidas().then(data => {
            data.subscribe(data => {
                this.conversasRecebidas = data;
                console.log(data, 'minha info --recebidas');

            });
        });
        this.chat.getConversasEnviadas().then(data => {
            data.subscribe(data => {
                this.conversasEnviadas = data;
                console.log(data, 'minha info --enviadas');

            });

        });
    }

    goToMensagem(sala) {
        if (!sala) sala = null;
        this.navCtrl.push(MensagemPage, {
            "key": sala.pet,
            "idGrouped": sala.dono_interessado_pet,
            "titulo": sala.nomePet,
            "id_interessado": sala.id_interessado
        });
    }
}
