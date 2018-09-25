import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {AdotePage} from "./adote";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";
import {ComponentsModule} from "../../components/components.module";
import {DatePipe} from "@angular/common";

@NgModule({
    declarations: [
        AdotePage
    ],
    imports: [
        IonicPageModule.forChild(AdotePage),
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
        AdotePage
    ]

})
export class AdotePageModule {

}