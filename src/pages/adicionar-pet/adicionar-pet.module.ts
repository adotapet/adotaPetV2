import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {AdicionarPetPage} from "./adicionar-pet";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { HttpLoaderFactory} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        AdicionarPetPage
    ],
    imports: [
        IonicPageModule.forChild(AdicionarPetPage),
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
        AdicionarPetPage
    ]

})
export class AdicionarPetPageModule {

}