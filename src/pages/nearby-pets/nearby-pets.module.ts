import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {NearbyPetsPage} from "./nearby-pets";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";

@NgModule({
    declarations: [
        NearbyPetsPage

    ],
    imports: [
        IonicPageModule.forChild(NearbyPetsPage),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        NearbyPetsPage
    ]

})
export class NearbyPetsPageModule {

}