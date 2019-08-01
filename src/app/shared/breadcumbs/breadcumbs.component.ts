import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: []
})
export class BreadcumbsComponent implements OnInit {

  pageTitle = '';

  constructor( private router: Router,
               private title: Title,
               private meta: Meta ) {

    
    this.getRouteData().subscribe( resp =>{
      this.pageTitle = resp.title;

      //Updating title
      const HTMLTitle =  'Adminpro - ' +  resp.title;
      this.title.setTitle(HTMLTitle);

      //Updating metatag
      const metaTag: MetaDefinition = {
        name: 'description',
        content: resp.title
      };

      this.meta.updateTag( metaTag );

    });

   }

  ngOnInit() {
  }

  getRouteData(){
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),//Filtering information
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data )
    );
  }

}
