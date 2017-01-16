export class Mensalidade{
    
    
	public id: number;
	public aluno: number;
	public turma: number;
	public matricula: number;
	public diaVencimento: number;
	public idMesReferencia: number;
	public mes: number;
	public ano: number;
	public situacao: string;
	public modalidadeTurma: string;
	public nivelTurma: string;
	public valorParaPagar: number;
	public valorMensalidade: number;
	public valorCalculado: number;
    
    constructor(){}

}