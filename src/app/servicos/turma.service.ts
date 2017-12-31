import { ConsultaAlunosMatriculados } from './../models/consulta-alunos-matriculados';
import { CadastroMatricula } from './../models/cadastro-matricula';
import { ConsultaTurma } from './../models/consulta-turmas';
import { CadastroTurma } from './../models/cadastro-turma';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import { environment } from './../../environments/environment';
import { AlunoService } from './aluno.service';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { Salas } from './../models/salas';
import { HttpCustormerService } from './http-custormer.service';
import { TipoDesconto } from './../models/tipo-desconto';


@Injectable()
export class TurmaService {

    constructor(private http: HttpCustormerService) { }
    excluir(id: Number) {
        return this.http.delete(environment.url + "turmas/" + id);
    }

    getAlunos(id: number) {
        return this.http.get(environment.url + "turmas/" + id + "/alunos").map((response: Response) => <ConsultaAlunosMatriculados[]>response.json());
    }

    getListaPresenca(id: number) {
        return this.http.get(environment.url + "turmas/" + id + "/lista-presenca").map((response: Response) => <any>response);
    }

    getTurma(id: number) {
        return this.http.get(environment.url + "turmas/" + id).map((response: Response) => <ConsultaTurma>response.json());
    }



    matricularAluno(cadastro: CadastroMatricula) {
        return this.http.post(environment.url + "matriculas", cadastro);
    }

    getTurmas() {
        return this.http.get(environment.url + 'turmas')
            .map((response: Response) => <ConsultaTurma[]>response.json());
    }

    getSalas() {
        return this.http.get(environment.url + 'salas')
            .map((response: Response) => <Salas[]>response.json());
    }

    getNiveis() {
        return this.http.get(environment.url + 'niveis/turmas')
            .map((response: Response) => <NivelTurma[]>response.json());
    }

    deletarModalidade(modalidade: ModalidadeTurma) {
        return this.http.delete(environment.url + 'modalidades/' + modalidade.id);
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
        return this.http.put(environment.url + 'modalidades/' + modalidade.id, modalidade);
    }

    cadastrarTurma(turma) {
        return this.http.post(environment.url + 'turmas', turma);
    }

    alterarTurma(turma) {
        return this.http.put(environment.url + 'turmas/' + turma.id, turma);
    }

    alterarDesconto(idMatricula: number, idDesconto: number) {
        let desconto: TipoDesconto = new TipoDesconto();
        desconto.id = idDesconto;
        return this.http.put(environment.url + "matriculas/" + idMatricula + "/desconto/", desconto);
    }


    excluirMatricula(idMatricula: number){
        return this.http.delete(environment.url + "matriculas/" + idMatricula);
    }
}
