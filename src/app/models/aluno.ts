import { AlunoTurma } from './aluno-turma';
import { EstadoCivil } from './estado-civil';
import { ConheceEscola } from './conhece-escola';

export class Aluno {

    public id: Number;
    public nome: string;
    public cpf: string;
    public rg: string;
    public email: string;
    public telefone: string;
    public endereco: string;
    public bairro: string;
    public cidade: string;
    public dataNascimento: Date;
    public profissao: string;
    public sexo: string;
    public conheceEscola: ConheceEscola;
    public estadoCivil :EstadoCivil ;
    public turmas: AlunoTurma[];
    public diaVencimento: number;
    public foto: string;

    constructor() {
        
    }

    
}