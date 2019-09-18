import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { UploadModalComponent } from '../components/upload-modal/upload-modal.component';
import { HospitalComponent } from './maintenance/hospital/hospital.component';
import { MedicComponent } from './medic/medic.component';
import { MedicsComponent } from './maintenance/medics/medics.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        UploadModalComponent,
        HospitalComponent,
        MedicComponent,
        MedicsComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        PAGES_ROUTES,
        ChartsModule,
        CommonModule,
        PipesModule
    ]
})

export class PagesModule { }
