import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagemPage } from './mensagem';
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../providers/emoji";

@NgModule({
  declarations: [
    MensagemPage
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(MensagemPage),
  ],
  exports: [
      MensagemPage
  ],
  providers: [
    EmojiProvider
  ]
})
export class ChatModule {
}
