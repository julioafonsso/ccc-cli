import { DatePipe } from '@angular/common';
import { Matricula } from './maticula';
import { Aluno } from './aluno';
import { Professor } from './professor';
import { NivelTurma } from './nivel-turma';
import { Salas } from './salas';
import { DiasSemana } from './dias-semana';
import { ModalidadeTurma } from './modalidade-turma';

export class Turma {

    public id: number;
    public codigo: String;
    public modalidade: ModalidadeTurma;
    public diasSemana: DiasSemana[];
    public horarioInicial: String;
    public dataInicio: DatePipe;
    public dataTermino: DatePipe
    public horarioFinal: String;
    public mensalidade: number;
    public sala: Salas;
    public nivel: NivelTurma;
    public vagas: number;
    public qtdAlunos: number;
    public qtdAlunas: number;
    public matriculas: Matricula[];
    public professor1: Professor;
    public percentualProfessor1: number;
    public professor2: Professor;
    public percentualProfessor2: number;
    public domingo: boolean;
    public segunda: boolean;
    public terca: boolean;
    public quarta: boolean;    
    public quinta: boolean;
    public sexta: boolean;
    public sabado: boolean;

    constructor() {
        this.diasSemana = [];
        this.nivel = new NivelTurma()
        this.sala = new Salas();
        this.modalidade = new ModalidadeTurma();
        this.matriculas = [];
    }
}
