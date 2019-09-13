import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTING } from './app.routes';

// Modules
import { PagesModule } from './pages/pages.module';

//Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Pipes Module
import { PipesModule } from './pipes/pipes.module';

// Services
import { ServicesModule } from './services/services.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    // NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PagesModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
