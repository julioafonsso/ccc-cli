import { DatePipe } from '@angular/common';

export class Professor {

    public id: Number;
    public cpf: string;
    public nome: string;
    public rg: string;
    public email: string;
    public endereco: string;
    public telefone: string;
    public dataAdmissao: DatePipe;
    public observacao: string;
    public sexo: string;
    public dataNascimento: DatePipe;
    public foto: string;
    
    constructor() { }
}