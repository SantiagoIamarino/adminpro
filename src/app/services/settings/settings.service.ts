import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default-dark.css',
    theme: 'default-dark'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.loadSettings();
   }

  loadSettings(){
    if( localStorage.getItem( 'theme' ) ){
      this.settings = JSON.parse( localStorage.getItem('theme') );
    }
  }

  saveSettings(){
    localStorage.setItem( 'theme', JSON.stringify( this.settings ) );
    this.applyTheme();
  }

  applyTheme(){
    const theme_css = this._document.getElementById('theme_css');
    const url = 'assets/css/colors/';
    theme_css.setAttribute('href', this.settings.themeUrl);
  }

}

interface Settings {
  themeUrl: string;
  theme: string;
}
