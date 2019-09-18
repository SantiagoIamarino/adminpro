import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { UploadModalService } from '../../../components/upload-modal/upload-modal.service';

declare var swal;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  loading = false;

  hospitals: Hospital[] = [];
  totalHospitals = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _uploadModalService: UploadModalService
  ) {
      this.getHospitals();

      this._uploadModalService.notification.subscribe( res =>{
        this.getHospitals();
      } );

   }

  ngOnInit() {
  }

  getHospitals(){
    this._hospitalService.getHospitals().subscribe( (res: any) =>{
      this.hospitals = res.hospitals;
      this.totalHospitals = res.count;
    });
  }

  searchHospitals( term: string ){

    if(!term){
      this.getHospitals();
      return;
    }

    this._hospitalService.findHospital( term ).subscribe( (res: any) =>{
      this.hospitals = res.hospital;
    } );

  }

  newHospital(){
    swal({
      text: 'Type a name of a new Hospital',
      content: 'input',
      button: {
        text: 'Create hospital',
        closeModal: true,
      },
    })
    .then(name => {

      if(!name){
        return;
      }

      this._hospitalService.newHospital( name ).subscribe( (res: any) =>{

        swal('Hospital created',
             res.hospital.name + ' has been created', 'success');
             
        this.getHospitals();

      } );
      
    });
  }

  deleteHospital( id: string ){

    swal({
      title: 'Are you sure?',
      text: 'Do you want to delete this Hospital?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (!willDelete) {
        return;
      }else{
        this._hospitalService.deleteHospital( id ).subscribe( res => {
          this.getHospitals();
        } );
      }
      
    });
  }

  changeImage(id: string, img: string){
    this._uploadModalService.openModal( id, img, 'hospital' );
  }

  updateHospital(name: string, id: string){
    const hospital = new Hospital(name);

    this._hospitalService.updateHospital(hospital, id).subscribe( res =>{
      this.getHospitals();
    } );

  }

}
