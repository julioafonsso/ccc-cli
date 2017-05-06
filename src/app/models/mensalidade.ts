import { Matricula } from './maticula';
import { FluxoCaixa } from './fluxo-caixa';
import { MesReferencia } from './mes-referencia';
import { Aluno } from './aluno';
import { Turma } from './turma';
export class Mensalidade{
    
    
	public id: number;
	public mesReferencia :MesReferencia;
    public fluxoCaixa: FluxoCaixa;
	public matricula: Matricula;
	public valorCalculado: number;
	public valorMensalidade:number;
	public dataVencimento: Date;
	public valorParaPagar:number;
	
    constructor(){}

}