import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Medic } from '../../models/medico.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  medicos: Medic[] = [];


  constructor(
    public _searchService: SearchService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe( params => {
      const term = params.term;

      if( !Number.isNaN( term ) ){
        this._searchService.search( term ).subscribe( (res: any) => {
          this.users = res.users;
          this.hospitals = res.hospitals;
          this.medicos = res.medicos;
        } );

        
      }
      
    } );
   }

  ngOnInit() {
  }

}
