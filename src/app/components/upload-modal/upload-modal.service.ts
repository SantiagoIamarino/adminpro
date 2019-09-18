import { Injectable, EventEmitter } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';

declare var swal;

@Injectable({
  providedIn: 'root'
})


export class UploadModalService {

  hiddenOrVisible = 'hidden';

  lastImg = 'xxx';
  tempImg: any = null;
  id: string;
  type = 'user';

  public notification = new EventEmitter();

  constructor(
    public _uploadFileService: UploadFileService
  ) { }

  openModal(id: string, img: string, type: string){
    if(img){
      this.lastImg = img;
    }
    this.hiddenOrVisible = 'visible';
    this.id = id;
    this.type = type;
  }

  closeModal(){
    this.lastImg = 'xxx';
    this.id = null;
    this.hiddenOrVisible = 'hidden';
    this.tempImg = null;
    this.type = null;
  }

  uploadImage(file: File){
    this._uploadFileService.uploadFile(file, this.type, this.id).then( res =>{

      this.lastImg = 'xxx';
      this.id = null;
      this.tempImg = null;
      this.hiddenOrVisible = 'hidden';

      swal('Image uploaded', 'Image has been uploaded correctly', 'success');

      this.notification.emit(res);

    } ).catch( err =>{
      console.error( err );
    } );
  }

}
