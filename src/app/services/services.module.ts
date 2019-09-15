import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { 
  SettingsService, 
  SharedService, 
  SidebarService,
  UserService,
  UploadFileService,
  UploadModalService
} from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    UploadFileService,
    UploadModalService
  ]
})
export class ServicesModule { }
