import { Usuario } from './usuario';
import { TipoFluxo } from './tipo-fluxo';

export class FluxoCaixa {

    public id: Number;
    public valor: Number;
    public dataFluxo: Date;
    public tipoFluxo: TipoFluxo;
    public descricao: String;
    public userLancamento: Usuario;

    constructor() { }
}