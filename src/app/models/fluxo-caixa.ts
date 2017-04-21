import { DatePipe } from '@angular/common';
import { Usuario } from './usuario';
import { TipoFluxo } from './tipo-fluxo';

export class FluxoCaixa {

    public id: number;
    public valor: Number;
    public data: Date;
    public tipoFluxo: TipoFluxo;
    public descricao: String;
    public observacao: String;
    public userLancamento: Usuario;
    public quantidade: number;
    
    constructor() { }
}