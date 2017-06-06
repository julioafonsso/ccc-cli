import { DatePipe } from '@angular/common';
import { CadastroProfessor } from './../models/cadastro-professor';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FtpService } from './../servicos/ftp.service';
import { FileUploader } from 'ng2-file-upload';
import { Message } from 'primeng/primeng';
import { ProfessorService } from './../servicos/professor.service';



@Component({
    selector: 'app-cadastro-professor',
    templateUrl: './cadastro-professor.component.html',
    styleUrls: ['./cadastro-professor.component.scss']
})

export class CadastroProfessorComponent implements OnInit {

    private professor: CadastroProfessor;
    private msgs: Message[];
    public uploader: FileUploader;
    private url: string;
    private envieiFoto: boolean;
    private submit: boolean;

    constructor(private route: ActivatedRoute, private professorService: ProfessorService, private ftpService: FtpService, private roteador: Router) {
        this.submit = false;
        this.professor = new CadastroProfessor();
        this.url = "";
        this.uploader = new FileUploader({ url: "" });
        this.msgs = [];
        this.envieiFoto = false;
    }

    ngOnInit() {
        this.loadProfessor();
    }

    reset() {
        this.submit = false;
        this.professor = new CadastroProfessor();
        this.envieiFoto = false;
    }

    loadProfessor() {
        this.route.params.subscribe(
            (params: any) => {
                if (params['id'] != undefined) {
                    this.submit = true;
                    this.envieiFoto = true;
                    this.professorService.getProfessor(params['id']).subscribe(res => {
                            let dp = new DatePipe("pt");
                            
                            this.professor.id = res.id;
                            this.professor.cpf = res.cpf;
                            this.professor.nome = res.nome;
                            this.professor.rg = res.rg;
                            this.professor.email = res.email;
                            this.professor.endereco = res.endereco;
                            this.professor.telefone = res.telefone;
                            this.professor.dataAdmissao =  dp.transform(new Date(res.dataAdmissao),"yyyy-MM-dd");
                            this.professor.observacao = res.observacao;
                            this.professor.sexo = res.sexo;
                            this.professor.dataNascimento = dp.transform(new Date(res.dataNascimento),"yyyy-MM-dd");;
                            this.professor.foto = res.foto;


                        this.submit = false;
                    })
                }
            }
        );
    }

    cadastrar() {
        console.log(this.professor);
        if (this.professor.id != undefined)
            return this.professorService.atualizarProfessor(this.professor)
        else
            return this.professorService.cadastrarProfessor(this.professor)
    }

    onSubmit() {
        this.submit = true;

        this.cadastrar()
            .subscribe(res => {
                this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
                this.roteador.navigate(['/detalhe-professor/',res.json().id]);
            },
            error => {
                this.submit = false;
                this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
            });

    }


    onChange(event) {
        this.ftpService.cadastrarFoto(this.uploader);
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status === 200) {
                this.professor.foto = response
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
