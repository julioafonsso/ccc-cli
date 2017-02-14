import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appNumeroInteiro]'
})
export class NumeroInteiroDirective {

  
  constructor() { }
  
  private numeros: string = "0123456789"
  @HostListener("keypress", ['$event']) keyPress(event) {
    return this.ehNumero(event.key)
  }

  @HostListener("keyup", ['$event']) keyUp(event) {}

  @HostListener("keydown", ['$event']) keyDown(event) { }


  @HostListener('focus', ['$event']) onFocus(event) {}

  @HostListener('focusout', ['$event.target']) onFocusOut(target) {}


  ehNumero(caracter: string) {
    return this.numeros.indexOf(caracter) > -1
  }


}
