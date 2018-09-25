import {NgModule} from '@angular/core';
import {EmojiPickerComponent} from "./emoji-picker/emoji-picker";
import {IonicPageModule} from "ionic-angular";
import {MeusPetsComponent} from "./meus-pets/meus-pets";
import {PleaseLoginComponent} from "./please-login/please-login";
import {SalasChatComponent} from "./salas-chat/salas-chat";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
    declarations: [
        EmojiPickerComponent,
        MeusPetsComponent,
        PleaseLoginComponent,
        SalasChatComponent
    ],
    imports: [
        IonicPageModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        EmojiPickerComponent,
        MeusPetsComponent,
        PleaseLoginComponent,
        SalasChatComponent
    ]
})
export class ComponentsModule {
}
