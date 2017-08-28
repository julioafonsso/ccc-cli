import { DatePipe } from '@angular/common';
import { Bairro } from './../models/bairro';
import { BairroService } from './../servicos/bairro.service';
import { CadastroAluno } from './../models/cadastro-aluno';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { FtpService } from './../servicos/ftp.service';
import { FileUploader } from 'ng2-file-upload';
import { AlunoService } from './../servicos/aluno.service';
import { ConheceEscola } from './../models/conhece-escola';
import { Message } from 'primeng/primeng';
import { EstadoCivil } from './../models/estado-civil';

@Component({
    selector: 'app-cadastro-aluno',
    templateUrl: './cadastro-aluno.component.html',
    styleUrls: ['./cadastro-aluno.component.scss']
})
export class CadastroAlunoComponent implements OnInit {

    private listaEstadoCivil: EstadoCivil[];
    public uploader: FileUploader;
    private msgs: Message[];
    private dataNascimento: Date;
    private submit: boolean;
    private listaComoConheceu: ConheceEscola[];
    private aluno: CadastroAluno;
    private foto: any;
    private url: string;
    private envieiFoto: boolean;
    private load: any;

    constructor(private route: ActivatedRoute, 
                private alunoService: AlunoService,
                private bairroService: BairroService, 
                private ftpService: FtpService,
                private roteador: Router) {
        this.aluno = new CadastroAluno();
        this.url = "";
        this.uploader = new FileUploader({ url: "" });
        this.msgs = [];
        this.envieiFoto = false;
        this.submit = false;
        this.listaEstadoCivil = [];
        this.listaComoConheceu = []
    }

    ngOnInit() {
        this.alunoService.getListaEstadoCivil().subscribe(res => {
            this.listaEstadoCivil = res;
        })

        this.alunoService.getListaComoConheceu().subscribe(res => {
            this.listaComoConheceu = res;
        })

        this.loadAluno()
    }

    loadAluno() {
        if (this.listaEstadoCivil.length == 0 || this.listaComoConheceu.length == 0 ) {
            this.load = setInterval(() => { this.loadAluno() }, 500);
        }
        else {
            clearInterval(this.load);
            this.route.params.subscribe(
                (params: any) => {
                    if (params['id'] != undefined) {
                        this.submit = true;
                        this.envieiFoto = true;
                        this.alunoService.getAluno(params['id']).subscribe(res => {
                            this.aluno = res;
                            this.submit = false;

                        })
                    }
                }
            );
        }

    }

    reset() {
        this.aluno = new CadastroAluno();
        this.envieiFoto = false;
        this.dataNascimento = null;
        this.submit = false;
    }

    cadastrarAluno() {
        if (this.aluno.id != undefined) {
            return this.alunoService.alterar(this.aluno);
        }
        return this.alunoService.cadastrar(this.aluno)

    }

    onSubmit() {
        this.cadastrarAluno()
            .subscribe(response => {
                this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
                this.reset();
                this.roteador.navigate(['/detalhe-aluno/',response.json().id]);
            },
            error => {
                this.submit = false;
                this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
            })
    }

    onChange(event) {

        this.ftpService.cadastrarFoto(this.uploader);

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status === 200) {
                this.aluno.foto = response
                this.envieiFoto = true;
            }
            else {
                this.msgs.push({ severity: 'error', summary: JSON.parse(response)["message"] });
                this.envieiFoto = false;
            }

        }
    }

    getUploadSuccess() {
        return this.envieiFoto && !this.uploader.isUploading;
    }
}

