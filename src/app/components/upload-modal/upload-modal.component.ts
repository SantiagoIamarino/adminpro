import { Component, OnInit } from '@angular/core';
import { UploadModalService } from '../../services/services.index';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styles: []
})
export class UploadModalComponent implements OnInit {

  imageToUpload: File;
  tempImg: any = null;

  constructor(
    public _uploadModalService: UploadModalService
  ) { }

  ngOnInit() {
  }

  newImage( event ){
    if( !event.target.files[0] ){
      this.imageToUpload = null;
      return;
    }

    this.imageToUpload = event.target.files[0];

    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL( this.imageToUpload );

    reader.onloadend = () => {
      this._uploadModalService.tempImg = reader.result;
    };
  
  }

  uploadImage(){
    this._uploadModalService.uploadImage(this.imageToUpload);
  }

}
