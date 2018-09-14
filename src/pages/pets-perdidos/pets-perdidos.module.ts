import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetsPerdidosPage } from './pets-perdidos';

@NgModule({
  declarations: [
    PetsPerdidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PetsPerdidosPage),
  ],
})
export class PetsPerdidosPageModule {}
