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
    private sala: Salas;
    private nivel: NivelTurma;
    private professores: TurmaProfessor[];
    private vagas: Number;

    constructor() {
        this.professores = [];
        this.diasSemana = [];

    }

    inicializarTurmaProfessor() {
        this.professores[0] = new TurmaProfessor();
        this.professores[1] = new TurmaProfessor();
        console.log(this.professores);
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
