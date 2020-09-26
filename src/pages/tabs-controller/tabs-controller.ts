import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {AdotePage} from "../adote/adote";
import {AdicionarPetPage} from "../adicionar-pet/adicionar-pet";
import {UserPerfilPage} from "../user-perfil/user-perfil";

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = AdotePage;
  tab2Root: any = AdicionarPetPage;
  tab3Root: any = UserPerfilPage;
  notifications:any = [{'idSala': '', 'count': 0}];
  count = 0;

  constructor(public navCtrl: NavController, public events: Events) {

    this.events.subscribe('notification:received', (not) => {
      let idSala = not.idSala;
      //this.count = '!';
      this.notifications.idSala = 0;
      this.notifications.map((notification) => {
        if (notification.idSala == idSala) notification.count++;
      })
    });
    this.events.subscribe('notification:opened', (idSala) => {
      this.notifications.map((notification) => {
        if (notification.idSala == idSala) {
        //  this.count = this.count - notification.count;
          notification.count = 0
        }
      })
    });
  }
}
