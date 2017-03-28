import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FtpService } from './../servicos/ftp.service';
import { FileUploader } from 'ng2-file-upload';
import { Professor } from './../models/professor';
import { Message } from 'primeng/primeng';
import { ProfessorService } from './../servicos/professor.service';

@Component({
    selector: 'app-cadastro-professor',
    templateUrl: './cadastro-professor.component.html',
    styleUrls: ['./cadastro-professor.component.scss']
})
export class CadastroProfessorComponent implements OnInit {

    private professor: Professor;
    private msgs: Message[];
    public uploader: FileUploader;
    private url: string;
    private envieiFoto: boolean;
    private dataNascimento: Date;
    private dataAdmissao: Date;
    private submit: boolean;

    constructor(private route: ActivatedRoute, private professorService: ProfessorService, private ftpService: FtpService) {
        this.submit = false;
        this.professor = new Professor();
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
        this.professor = new Professor();
        this.envieiFoto = false;
        this.dataAdmissao = null;
        this.dataNascimento = null;
    }

    loadProfessor() {
        this.route.params.subscribe(
            (params: any) => {
                if (params['id'] != undefined) {
                    this.submit = true;
                    this.envieiFoto = true;
                    this.professorService.getProfessor(params['id']).subscribe(res => {
                        this.professor = res;
                        this.submit = false;
                    })
                }
            }
        );
    }

    cadastrar() {
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
                this.reset()
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
