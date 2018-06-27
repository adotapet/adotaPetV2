import {NgModule} from '@angular/core';
import {SalasChatComponent} from './salas-chat/salas-chat';
import {MeusPetsComponent} from './meus-pets/meus-pets';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header';

@NgModule({
    declarations: [
        SalasChatComponent,
        MeusPetsComponent,
    	ShrinkingSegmentHeaderComponent
    	],
    imports: [],
    exports: [
        SalasChatComponent,
        MeusPetsComponent,
        ShrinkingSegmentHeaderComponent
        ]
})
export class ComponentsModule {
}
