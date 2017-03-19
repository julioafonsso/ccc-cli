import { TipoDesconto } from './../models/tipo-desconto';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import { environment } from './../../environments/environment';
import { AlunoService } from './aluno.service';
import { Aluno } from './../models/aluno';
import { Turma } from './../models/turma';
import { Matricula } from './../models/maticula';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { DiasSemana } from './../models/dias-semana';
import { Salas } from './../models/salas';
import { HttpCustormerService } from './http-custormer.service';


@Injectable()
export class TurmaService {

    constructor(private http: HttpCustormerService) { }

    matricularAluno(turma: Turma, aluno: Aluno, desconto: TipoDesconto, diaVencimento: number, valorMatricula: number) {
        let matricula = new Matricula();
        matricula.aluno = aluno;
        matricula.turma = turma;
        matricula.diaVencimento = diaVencimento;
        matricula.desconto = desconto;

        let valor = valorMatricula.toString().replace(/[^0-9]/gi, '');
        matricula.valor = Number(valor.substr(0, valor.length - 2) + "." + valor.substring(valor.length - 2))

        return this.http.post(environment.url + "turmas/matricula", matricula);
    }

    finalizar(turma: Turma) {
        return this.http.delete(environment.url + "turmas/" + turma.id);
    }

    excluirAlunoTurma(matricula: Matricula) {
        return this.http.delete(environment.url + "turmas/matricula/" + matricula.id);
    }

    getTurma(id: number) {
        return this.http.get(environment.url + "turmas/" + id).map((response: Response) => <Turma>response.json());
    }

    getMatriculas(id: number) {
        return this.http.get(environment.url + "turmas/" + id+"/alunos").map((response: Response) => <Matricula[]>response.json());
    }

    getTurmas() {
        return this.http.get(environment.url + 'turmas')
            .map((response: Response) => <Turma[]>response.json());
    }

    getSalas() {
        return this.http.get(environment.url + 'salas')
            .map((response: Response) => <Salas[]>response.json());
    }

    getNiveis() {
        return this.http.get(environment.url + 'niveis/turmas')
            .map((response: Response) => <NivelTurma[]>response.json());
    }

    getModalidades() {
        return this.http.get(environment.url + 'modalidades')
            .map((response: Response) => <ModalidadeTurma[]>response.json());
    }

    getModalidade(id: number) {
        return this.http.get(environment.url + 'modalidades/' + id)
            .map((response: Response) => <ModalidadeTurma>response.json());
    }

    cadastrarModalidade(modalidade: ModalidadeTurma) {
        return this.http.post(environment.url + 'modalidades', modalidade);
    }

    alterarModalidade(modalidade: ModalidadeTurma) {
        return this.http.put(environment.url + 'modalidades', modalidade);
    }

    cadastrarTurma(turma) {
        return this.http.post(environment.url + 'turmas', this.tratarDadosTurma(turma));
    }

    alterarTurma(turma) {
        return this.http.put(environment.url + 'turmas', this.tratarDadosTurma(turma));
    }

    private tratarDadosTurma(turma: Turma){
        console.log(turma.mensalidade)
        let turma2: Turma = Object.assign({}, turma);
        console.log(turma2.mensalidade)
        let valor = turma2.mensalidade.toString().replace(/[^0-9]/gi, '');
        console.log(valor);
        turma2.mensalidade = Number(valor.substr(0, valor.length - 2) + "." + valor.substring(valor.length - 2))

        console.log(turma2)
        return turma2;
    }
}
