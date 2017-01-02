import { Turma } from './turma';
import { Professor } from './professor';
export class TurmaProfessor {
    
    private id: Number;
    private percentual: Number;
    private professor: Professor;
    private turma: Turma;

    constructor() {

        this.professor = new Professor();
        // this.turma = new Turma();
     }
}