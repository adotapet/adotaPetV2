import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LoginPage} from "./login";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
    declarations: [
        LoginPage
    ],
    imports: [
        IonicPageModule.forChild(LoginPage),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        LoginPage
    ]

})
export class LoginPageModule {

}