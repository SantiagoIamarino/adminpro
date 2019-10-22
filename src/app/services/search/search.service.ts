import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICES_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    public http: HttpClient
  ) { }

  search( term: string ){
    const url = SERVICES_URL + '/search/all/' + term;

    return this.http.get( url );

  }
}
