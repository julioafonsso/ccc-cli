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
    private listaBairros: Bairro[];

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

        this.bairroService.getBairros().subscribe(res =>{
            this.listaBairros = res;
        })
        this.loadAluno()
    }

    loadAluno() {
        if (this.listaEstadoCivil.length == 0 || this.listaComoConheceu.length == 0) {
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
                           
                                let dp = new DatePipe("pt");
                                let data = new Date(res.dataNascimento);

                                this.aluno.id = res.id;
                                this.aluno.nome = res.nome;
                                this.aluno.cpf = res.cpf;
                                this.aluno.rg = res.rg;
                                this.aluno.email = res.email;
                                this.aluno.telefone = res.telefone;
                                this.aluno.endereco = res.endereco;
                                this.aluno.numero = res.numero;
                                this.aluno.complemento = res.complemento;
                                this.aluno.idBairro = res.idBairro;
                                this.aluno.cidade = res.cidade;
                                this.aluno.dataNascimento = dp.transform(data,"yyyy-MM-dd"); 
                                this.aluno.profissao = res.profissao;
                                this.aluno.sexo = res.sexo;
                                this.aluno.idConheceEscola = res.idConheceEscola;
                                this.aluno.idEstadoCivil = res.idEstadoCivil;
                                this.aluno.foto = res.foto;
                            // this.listaEstadoCivil.forEach(v => {
                            //     if (v.id == this.aluno.idEstadoCivil.id) {
                            //         this.aluno.estadoCivil = v;
                            //     }
                            // })
                            // this.listaComoConheceu.forEach(v => {
                            //     if (v.id == this.aluno.conheceEscola.id) {
                            //         this.aluno.conheceEscola = v;
                            //     }
                            // })
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
                console.log(response.json());
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

