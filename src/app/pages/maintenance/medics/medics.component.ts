import { Component, OnInit } from '@angular/core';
import { Medic } from '../../../models/medico.model';
import { MedicService } from '../../../services/medic/medic.service';
import { Router } from '@angular/router';

declare var swal;

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: []
})
export class MedicsComponent implements OnInit {

  loading = false;

  totalMedics = 0;

  medics: Medic[] = [];

  constructor(
    public medicService: MedicService,
    public router: Router
  ){
    this.getMedics();
   }

  ngOnInit() {
  }

  getMedics(){
    this.loading = true;

    this.medicService.getMedics().subscribe( (res: any) =>{
      this.medics = res.medicos;
      this.totalMedics = res.count;

      this.loading = false;
    } );
  }

  searchMedics( term: string ){
    if(!term){
      this.getMedics();
      return;
    }

    this.loading = true;

    this.medicService.findMedic( term ).subscribe( (res: any) =>{
      this.medics = res.medic;

      this.loading = false;
    } );
  }

  updateMedic( id: string ){
    this.router.navigate(['/medic/' + id]);
  }

  deleteMedic( id: string ){

    swal({
      title: 'Are you sure?',
      text: 'You are going to delete this medic' ,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( willDelete =>{

      if(willDelete){
        this.medicService.deleteMedic( id ).subscribe( res =>{
          this.getMedics();
        } );
      }else{
        return;
      }

    });
  }

}
