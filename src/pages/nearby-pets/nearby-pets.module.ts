import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyPetsPage } from './nearby-pets';

@NgModule({
  declarations: [
    NearbyPetsPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyPetsPage),
  ],
    exports: [
        NearbyPetsPage
    ]
})
export class NearbyPetsPageModule {}
