import { AlunoTurma } from './aluno-turma';
import { Aluno } from './aluno';
import { TurmaProfessor } from './turma-professor';
import { Professor } from './professor';
import { NivelTurma } from './nivel-turma';
import { Salas } from './salas';
import { DiasSemana } from './dias-semana';
import { ModalidadeTurma } from './modalidade-turma';

export class Turma {

    public id: Number;
    public modalidade: ModalidadeTurma;
    public diasSemana: DiasSemana[];
    public horarioInicial: String;
    public horarioFinal: String;
    public mensalidade: Number;
    public sala: Salas;
    public nivel: NivelTurma;
    public professores: TurmaProfessor[];
    public vagas: Number;
    public qtdAlunos: number;
    public qtdAlunas: number;
    public alunos: AlunoTurma[];

    constructor() {
        this.professores = [];
        this.diasSemana = [];
        this.nivel = new NivelTurma()
        this.sala = new Salas();
        this.modalidade = new ModalidadeTurma();
        this.alunos = [];
    }

    inicializarTurmaProfessor() {
        this.professores[0] = new TurmaProfessor();
        this.professores[1] = new TurmaProfessor();
        
    }

    addDia(dia: DiasSemana)
    {
        
        this.diasSemana.push(dia);
        console.log(this.diasSemana);
    }

    removeDia(dia: DiasSemana)
    {
        var index = this.diasSemana.indexOf(dia, 0);
        if(index>-1)
        {
            this.diasSemana.splice(index, 1);
        }
        console.log(this.diasSemana);
    }

}
