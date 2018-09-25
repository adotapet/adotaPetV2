import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CadastrarPage} from "./cadastrar";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
    declarations: [
        CadastrarPage
    ],
    imports: [
        IonicPageModule.forChild(CadastrarPage),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        CadastrarPage
    ]

})
export class CadastrarPageModule {

}