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


    // deletarDesconto(matricula: Matricula) {
    //     return this.http.delete(environment.url + "turmas/matricula/" + matricula.id + "/desconto");
    // }

    // alterarDesconto(matricula: Matricula) {
    //     return this.http.put(environment.url + "turmas/matricula/" + matricula.id + "/desconto/" + matricula.desconto.id, null);
    // }


    // finalizar(turma: Turma) {
    //     return this.http.delete(environment.url + "turmas/" + turma.id);
    // }

    // excluirAlunoTurma(matricula: Matricula) {
    //     return this.http.delete(environment.url + "turmas/matricula/" + matricula.id);
    // }

    // getTurma(id: number) {
    //     return this.http.get(environment.url + "turmas/" + id).map((response: Response) => <Turma>response.json());
    // }

    // getMatriculas(id: number) {
    //     return this.http.get(environment.url + "turmas/" + id + "/alunos").map((response: Response) => <Matricula[]>response.json());
    // }


    matricularAluno(cadastro: CadastroMatricula) {

        cadastro.valor = cadastro.valor.toString().replace(/[^0-9]/gi, '');

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
        return this.http.put(environment.url + 'modalidades', modalidade);
    }

    cadastrarTurma(turma) {
        return this.http.post(environment.url + 'turmas', this.tratarDadosTurma(turma));
    }

    alterarTurma(turma) {
        return this.http.put(environment.url + 'turmas', this.tratarDadosTurma(turma));
    }

    private tratarDadosTurma(turma: CadastroTurma) {
        let valor = turma.valorMensalidade.toString();
        if (valor.indexOf(",") < 0) {
            if (valor.indexOf(".") < 0)
                valor = valor + ",00";
        }
        let turma2: CadastroTurma = Object.assign({}, turma);
        valor = valor.replace(/[^0-9]/gi, '');
        turma2.valorMensalidade = Number(valor.substr(0, valor.length - 2) + "." + valor.substring(valor.length - 2))

        return turma2;
    }
}
