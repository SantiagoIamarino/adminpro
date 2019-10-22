import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from '../services/guards/login.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalComponent } from './maintenance/hospital/hospital.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicComponent } from './medic/medic.component';
import { SearchComponent } from './search/search.component';
import { AdminGuardGuard } from '../services/guards/admin-guard.guard';


const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'graphics1', component: Graphics1Component, data: { title: 'Graphics' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
            { path: 'medic/:id', component: MedicComponent, data: { title: 'Medic profile' } },
            { path: 'search/:term', component: SearchComponent, data: { title: 'Search something' } },

            //Maintenance
            { path: 'users', 
              canActivate: [ AdminGuardGuard ],
              component: UsersComponent, 
              data: { title: 'Users maintenance' } 
            },
            { path: 'hospitals', component: HospitalComponent, data: { title: 'Hospitals maintenance' } },
            { path: 'medics', component: MedicsComponent, data: { title: 'Medics maintenance' } },

            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( PagesRoutes );

