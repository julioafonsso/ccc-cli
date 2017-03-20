import { Extrato } from './extrato';
import { Usuario } from './usuario';
import { TipoFluxo } from './tipo-fluxo';

export class ExtratoConsolidado {

    public quantidade :number;
    public valor: number;
    public nome: string;
    public id: number;
    public lancamentos: Extrato[];
    public mostrarDetalhe: boolean;

    
    constructor() { }
}