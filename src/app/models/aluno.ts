import { EstadoCivil } from './estado-civil';
import { ConheceEscola } from './conhece-escola';

export class Aluno {

    public id: Number;
    public nome: String;
    public cpf: String;
    public rg: String;
    public email: String;
    public telefone: String;
    public endereco: String;
    public bairro: String;
    public cidade: String;
    public dataNacimento: Date;
    public profissao: String;
    public sexo: String;
    public conheceEscola: ConheceEscola;
    public estadoCivil :EstadoCivil ;

    constructor() {}

}