import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SettingsService } from '../../services/services.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( private _settings: SettingsService, 
               @Inject(DOCUMENT) private _document ) { }

  ngOnInit() {
  }

  changeTheme( theme, link ){
    
    this._settings.settings.theme = theme;
    this._settings.settings.themeUrl = 'assets/css/colors/' + theme + '.css';

    this._settings.saveSettings();

    this.changeCheck( link );
  }

  changeCheck( link ){
      const selectors = this._document.getElementsByClassName('selector');

      for( let ref of selectors){
        ref.classList.remove('working');
      }

      link.classList.add('working');
  }

  getCheckStatus( link ){
    if(link.attributes['data-theme'].value == this._settings.settings.theme){
      return true;
    }else{
      return false;
    }
  }

}
