import {NgModule} from '@angular/core';
import {SalasChatComponent} from './salas-chat/salas-chat';
import {MeusPetsComponent} from './meus-pets/meus-pets';
import {PleaseLoginComponent} from './please-login/please-login';

@NgModule({
    declarations: [
        SalasChatComponent,
        MeusPetsComponent,
        PleaseLoginComponent,
    ],
    imports: [],
    exports: [
        SalasChatComponent,
        MeusPetsComponent,
        PleaseLoginComponent,
    ]
})
export class ComponentsModule {
}
