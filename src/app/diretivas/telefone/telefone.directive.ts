import { Directive, HostBinding, HostListener } from '@angular/core';


@Directive({
  selector: '[appTelefone]'
})
export class TelefoneDirective {

  constructor() { }
  private borderColor = '';
  private valorInicial: string = '(__)_____-____';
  private numeros: string = "0123456789"

  @HostBinding('style.borderColor') get setColor() {
    return this.borderColor;
  }

  @HostListener("keypress", ['$event']) keyPress(event) {
    if (this.getSomenteNumeros(event.target.value).length > 10)
      return false;
    return this.ehNumero(event.key)
  }

  @HostListener("keyup", ['$event']) keyUp(event) {
    if (this.ehNumero(event.key))
      this.formataValor(event.target)
  }

  @HostListener("keydown", ['$event']) keyDown(event) { }

  @HostListener('focus', ['$event.target']) onFocus(target) {
    this.limpaErro();
    if (target.value.length == 0) {
      this.formataInicial(target)
    }
  }

  @HostListener('focusout', ['$event.target']) onFocusOut(target) {
    this.formataValor(target)
  }

  private formataInicial(target) {
    target.value = this.valorInicial;
  }

  private formataValor(target) {
    let valor: string;
    let valorFormatado: string = '';
    let index: number = 0;
    valor = target.value;
    valor = this.getSomenteNumeros(valor);
    if (valor.length === 11) {
      valorFormatado = "(" + valor.substr(0, 2) + ")" + valor.substr(2, 5) + "-" + valor.substr(7);
    }
    else if (valor.length > 6) {
      valorFormatado = "(" + valor.substr(0, 2) + ")" + valor.substr(2, 4) + "-" + valor.substr(6);
    }
    else if (valor.length > 2) {
      valorFormatado = "(" + valor.substr(0, 2) + ")" + valor.substr(2)
    }
    else {
      valorFormatado = valorFormatado = "(" + valor.substr(0, 2) + ")";
    }
    target.value = valorFormatado;
  }


  setErro() {
    this.borderColor = 'red';
  }

  limpaErro() {
    this.borderColor = ''
  }

  getSomenteNumeros(valor: string) {
    return valor.replace(/[^0-9]/gi, '');
  }

  ehNumero(caracter: string) {
    return this.numeros.indexOf(caracter) > -1
  }

}
