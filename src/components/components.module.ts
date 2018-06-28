import {NgModule} from '@angular/core';
import {SalasChatComponent} from './salas-chat/salas-chat';
import {MeusPetsComponent} from './meus-pets/meus-pets';

@NgModule({
    declarations: [
        SalasChatComponent,
        MeusPetsComponent
    	],
    imports: [
    ],
    exports: [
        SalasChatComponent,
        MeusPetsComponent
        ]
})
export class ComponentsModule {
}
