import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
    selector: 'page-mensagem',
    templateUrl: 'mensagem.html'
})
export class MensagemPage {

    messages = [];
    contactName = 'Contact xx';

    constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
        console.log('menssagem page');
        this.messages = [
            {
                img: 'build/img/hugh.png',
                position: 'left',
                content: 'Hello from the other side.',
                senderName: 'Gregory',
                time: '28-Jun-2016 21:53'
            },
            {
                img: 'build/img/hugh.png',
                position: 'right',
                content: 'Hi! How are?',
                senderName: 'Me',
                time: '28-Jun-2016 21:55'
            },
            {
                img: 'build/img/hugh.png',
                position: 'left',
                content: "This is some really long test that I'm writing here. Let's see how it wraps.",
                senderName: 'Gregory',
                time: '28-Jun-2016 21:57'
            }
        ];
    }

    dismiss() {
        let data = {'foo': 'bar'};
        this.viewCtrl.dismiss(data);
    }
}
