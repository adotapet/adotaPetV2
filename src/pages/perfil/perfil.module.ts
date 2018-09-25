import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {PerfilPage} from "./perfil";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";

@NgModule({
    declarations: [
        PerfilPage
    ],
    imports: [
        IonicPageModule.forChild(PerfilPage),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        PerfilPage
    ]

})
export class PerfilPageModule {

}