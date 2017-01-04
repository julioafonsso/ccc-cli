import { Turma } from './turma';
import { Professor } from './professor';
export class TurmaProfessor {
    
    public id: Number;
    public percentual: Number;
    public professor: Professor;
    public turma: Turma;

    constructor() {

        this.professor = new Professor();
     }
}