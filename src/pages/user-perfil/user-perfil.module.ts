import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {UserPerfilPage} from "./user-perfil";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";
import {PleaseLoginComponent} from "../../components/please-login/please-login";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        UserPerfilPage
    ],
    imports: [
        IonicPageModule.forChild(UserPerfilPage),
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
        UserPerfilPage
    ]

})
export class UserPerfilPageModule {

}