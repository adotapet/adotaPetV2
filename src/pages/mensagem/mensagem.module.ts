import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {MensagemPage} from "./mensagem";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        MensagemPage
    ],
    imports: [
        IonicPageModule.forChild(MensagemPage),
        ComponentsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        MensagemPage
    ]

})
export class MensagemPageModule {

}