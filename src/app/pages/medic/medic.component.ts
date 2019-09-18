import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { MedicService } from '../../services/medic/medic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadModalService } from 'src/app/services/services.index';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {

  hospitals: Hospital[] = [];

  hospital: Hospital = new Hospital('');

  medic: Medic = new Medic('','','','','');
  medicId: string;

  constructor(
    public hospitalService: HospitalService,
    public medicService: MedicService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public uploadModalService: UploadModalService
  ){ 
    //Obteniendo hospitales
    this.hospitalService.getHospitals().subscribe( (res: any) =>{
      this.hospitals = res.hospitals;
    } );

    //Obteniendo parametros (id)
    this.activatedRoute.params.subscribe( params =>{
      if(params.id !== 'new'){
        this.getMedic(params.id);
      }
    } );

    //Notificacion de subida de imagen
    this.uploadModalService.notification.subscribe( (res: any) =>{
      this.medic.img = res.fileUploaded;
    } );

  }

  ngOnInit() {
  }

  getMedic(id: string) {
    this.medicService.getMedic( id ).subscribe( medico =>{
      if(medico){
        this.medic = medico;
        this.medicId = medico._id;
      }
    } );
  }

  changeHospital( event ){
    const hospital = event.target.value;

    if(hospital){
      this.medicService.getHospitalImage( hospital ).subscribe( res =>{
        this.hospital = res;
      });
    }

  }

  saveMedic( f: NgForm ){
    this.medic = f;

    if(this.medicId){
      this.medicService.updateMedic(this.medicId, this.medic).subscribe( medicId =>{
        this.getMedic(medicId);
      });
    }else{
      this.medicService.newMedic( this.medic ).subscribe( (medico: Medic) =>{
        this.router.navigate(['/medic/', medico._id]);
      } );
    }

    
  }

  uploadImage( id: string, img: string ){
    this.uploadModalService.openModal(id, img, 'medic');
  }

}
