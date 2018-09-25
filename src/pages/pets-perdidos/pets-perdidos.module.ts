import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {PetsPerdidosPage} from "./pets-perdidos";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";

@NgModule({
    declarations: [
        PetsPerdidosPage
    ],
    imports: [
        IonicPageModule.forChild(PetsPerdidosPage),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        PetsPerdidosPage
    ]

})
export class PetsPerdidosPageModule {

}