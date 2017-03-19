import { TipoDesconto } from './tipo-desconto';
import { Turma } from './turma';
import { Aluno } from './aluno';

export class Matricula
{
    public aluno : Aluno;
    public turma: Turma;
    public diaVencimento: number;
    public id: number;
    public desconto :TipoDesconto
    constructor()
    {
        // this.turma = new Turma();
    }
}