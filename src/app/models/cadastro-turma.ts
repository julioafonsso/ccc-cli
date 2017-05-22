export class CadastroTurma {

    public id: number;
    public idProfessor2: number;
	public percentualProfessor2: number;
    public idProfessor1: number;
	public percentualProfessor1: number;
	public qtdVagas: number;
	public valorMensalidade: number;
	public horarioInicial: string;
	public horarioFinal: string;
	public dataInicio: Date;
	public dataFim: Date;
	public domingo: boolean;
	public segunda: boolean;
	public terca: boolean;
	public quarta: boolean;
	public quinta: boolean;
	public sexta: boolean;
	public sabado: boolean;
	public idNivel: number;
	public idSala: number;
    public idModalidade: number;

    constructor() {
    }
}
