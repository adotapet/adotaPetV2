import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {AdotePage} from "./adote";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";


@NgModule({
    declarations: [
        AdotePage
    ],
    imports: [
        IonicPageModule.forChild(AdotePage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: false
        }),
        ComponentsModule
    ],
    exports: [
        AdotePage
    ],
    providers: []

})
export class AdotePageModule {

}