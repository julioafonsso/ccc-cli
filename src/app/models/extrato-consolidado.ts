import { Extrato } from './extrato';
import { Usuario } from './usuario';
import { TipoFluxo } from './tipo-fluxo';

export class ExtratoConsolidado {

    public qtdLancamentos :number;
    public valor: number;
    public nomeTipoLancamento: string;
    public idTipoLancamento: number;
    
    constructor() { }
}