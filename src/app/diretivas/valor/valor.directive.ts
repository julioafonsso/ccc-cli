import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appValor]'
})
export class ValorDirective {

  

  constructor() { }
  
  private numeros: string = "0123456789"
  @HostListener("keypress", ['$event']) keyPress(event) {
    return this.ehNumero(event.key)
  }

  @HostListener("keyup", ['$event']) keyUp(event) {
    if (this.ehNumero(event.key))
      this.formataValor(event.target)
  }

  @HostListener("keydown", ['$event']) keyDown(event) { }


  @HostListener('focus', ['$event']) onFocus(event) {
    if (event.target.value.length == 0) {
      this.formataInicial(event.target)
    }
  }

  @HostListener('focusout', ['$event.target']) onFocusOut(target) {
    this.formataValor(target)
  }

  private formataInicial(target) {
  }

  private formataValor(target) {
    let valor: string;
    let valorFormatado: string = '';
    let separador: string = '';
    let contador: number = 0;
    valor = this.getSomenteNumeros(target.value);
    
    if(valor.length < 3)
    {
      
      valor = '000' + valor;
      valor = valor.substr(valor.length - 3);
    }
    else{
      while(valor.startsWith('0') ){
        if(valor.length <4)
          break
        valor = valor.replace('0','');
      }
    }
    for (var i = valor.length; i >= 0 ; i--)
    {
      

      if(contador == 3)
        separador = ',';
      else if(contador > 3 && (contador -3) % 3 == 0)
        separador = '.';
      else
        separador = '';
      
      contador ++;
      valorFormatado = valor.substr(i,1) + separador +  valorFormatado;
    }

    target.value = valorFormatado;
  }

  getSomenteNumeros(valor: string) {
    return valor.replace(/[^0-9]/gi, '');
  }

  ehNumero(caracter: string) {

    console.log(caracter)
    console.log(this.numeros.indexOf(caracter))
    return this.numeros.indexOf(caracter) > -1
  }


}
