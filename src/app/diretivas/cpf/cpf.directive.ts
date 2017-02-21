import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';



@Directive({
  selector: '[appCpf]'
})
export class CpfDirective {

  constructor() { }
  private borderColor = '';
  private valorInicial = '___.___.___-__'
  private numeros: string = "0123456789"
  @HostBinding('style.borderColor') get setColor() {
    return this.borderColor;
  }
  @HostListener("keypress", ['$event']) keyPress(event) {
    if (this.getSomenteNumeros(event.target.value).length > 11)
      return false;
    return this.ehNumero(event.key)
  }

  @HostListener("keyup", ['$event']) keyUp(event) {
    if (this.ehNumero(event.key))
      this.formataValor(event.target)
  }

  @HostListener("keydown", ['$event']) keyDown(event) { }


  @HostListener('focus', ['$event']) onFocus(event) {
    this.limpaErro();
    if (event.target.value.length == 0) {
      this.formataInicial(event.target)
    }
  }

  @HostListener('focusout', ['$event.target']) onFocusOut(target) {
    this.formataValor(target)
    this.validarCPF(target);
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
    for (var n of this.valorInicial) {
      if (n == '_' && index < valor.length) {
        valorFormatado += valor.substr(index, 1);
        index++;
      }
      else {
        valorFormatado += n;
      }
    }

    target.value = valorFormatado;

  }



  private validarCPF(target) {
    var valor: string = target.value;
    valor = this.getSomenteNumeros(valor);

    if (valor.length > 0) {
      if (valor.length != 11) {
        this.setErro();
        return;
      }
      var primeiroDigito: number = this.getDigitoVeriicador(valor, 1);

      if (Number.parseInt(valor.substr(9, 1)) != primeiroDigito) {
        this.setErro();
        return;
      }

      var segundoDigito: number = this.getDigitoVeriicador(valor, 2)
      if (Number.parseInt(valor.substr(10, 1)) != segundoDigito) {
        this.setErro();
      }

    }
  }

  private getDigitoVeriicador(valor: string, digito: number) {
    var soma: number = 0;
    var peso: number;
    if (digito == 1)
      peso = 10;
    else if (digito == 2)
      peso = 11;


    for (var n of valor) {
      if (peso < 2)
        break;

      soma += (Number.parseInt(n) * peso);
      peso -= 1;
    }
    var resto = soma % 11;
    if (11 - resto > 9)
      return 0;
    return 11 - resto;
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


