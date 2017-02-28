import { MesReferencia } from './mes-referencia';
import { Mensalidade } from './mensalidade';
import { Professor } from './professor';
export class Salario{
    constructor(){}

    public id:number;
    public professor: Professor;
    public mensalidade: Mensalidade
    public mes:MesReferencia;
    public percentual: number;
    public valor: number;
}