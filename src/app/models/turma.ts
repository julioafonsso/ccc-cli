import { TurmaProfessor } from './turma-professor';
import { Professor } from './professor';
import { NivelTurma } from './nivel-turma';
import { Salas } from './salas';
import { DiasSemana } from './dias-semana';
import { ModalidadeTurma } from './modalidade-turma';

export class Turma {

    private id: Number;
    private modalidade: ModalidadeTurma;
    private diasSemana: DiasSemana[];
    private horarioInicial: String;
    private horarioFinal: String;
    private mensalidade: Number;
    private salaAula: Salas;
    private nivel: NivelTurma;
    private professores: TurmaProfessor[];
    private vagas: Number;

    constructor() {
        this.professores = [];
        console.log(this.professores);

    }

    inicializarTurmaProfessor() {
        this.professores[0] = new TurmaProfessor();
        this.professores[1] = new TurmaProfessor();
        console.log(this.professores);
    }


}
