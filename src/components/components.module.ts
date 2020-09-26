import { NgModule } from '@angular/core';

import { IonicPageModule } from "ionic-angular";
import { MeusPetsComponent } from "./meus-pets/meus-pets";
import { PleaseLoginComponent } from "./please-login/please-login";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app/app.module";
import { HttpClient } from "@angular/common/http";
import { SkeletonItemComponent } from './../components/skeleton-item/skeleton-item';

@NgModule({
    declarations: [
        MeusPetsComponent,
        PleaseLoginComponent,
        SkeletonItemComponent
    ],
    imports: [
        IonicPageModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [

        MeusPetsComponent,
        PleaseLoginComponent,
        SkeletonItemComponent
    ]
})
export class ComponentsModule {
}
