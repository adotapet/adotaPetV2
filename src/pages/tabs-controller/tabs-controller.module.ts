import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";
import {TabsControllerPage} from "./tabs-controller";

@NgModule({
    declarations: [
        TabsControllerPage
    ],
    imports: [
        IonicPageModule.forChild(TabsControllerPage),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        TabsControllerPage
    ]

})
export class TabsControllerPageModule {

}