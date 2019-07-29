import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('progressInput', { static: true }) progressInput: ElementRef;

  @Input() leyenda = 'Leyenda';
  @Input() progress:any = 50;

  @Output() newValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeValue( value ){

    const tempValue = this.progress + value;
    
    if(tempValue > 100){
      this.progress = 100;
    }else if(tempValue < 0){
      this.progress = 0;
    }else{
      // tslint:disable-next-line: radix
      this.progress = parseInt(this.progress) + value;
    }
    
    this.newValue.emit( this.progress );

    this.progressInput.nativeElement.focus();

  }

  inputChange( event ){

    if( event > 100 ){
      this.progress = 100;
    }else if( event < 0 || event == null ){
      this.progress = 0;
    }else{
      this.progress = event;
    }

    this.progressInput.nativeElement.value = this.progress;

    this.newValue.emit( this.progress );

  }

}
