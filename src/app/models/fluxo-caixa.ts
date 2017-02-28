import { Usuario } from './usuario';
import { TipoFluxo } from './tipo-fluxo';

export class FluxoCaixa {

    public id: Number;
    public valor: Number;
    public data: string;
    public tipoFluxo: TipoFluxo;
    public descricao: String;
    public userLancamento: Usuario;
    
    constructor() { }
}