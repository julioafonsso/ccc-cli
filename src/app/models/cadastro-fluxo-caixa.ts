import { DatePipe } from '@angular/common';
import { Usuario } from './usuario';
import { TipoFluxo } from './tipo-fluxo';

export class CadastroFluxoCaixa {

    public id: number;
    public valor: Number;
    public data: string;
    public idTipo: number;
    public descricao: String;
    public observacao: String;
    public qtd: number;
    public tipo: string;
    
    constructor() { }
}