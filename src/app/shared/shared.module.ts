import { NgModule } from '@angular/core';

import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcumbsComponent } from '../shared/breadcumbs/breadcumbs.component';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NopagefoundComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NopagefoundComponent
    ]
})

export class SharedModule { }


