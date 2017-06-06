import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { FuncionarioService } from './../servicos/funcionario.service';
import { FtpService } from './../servicos/ftp.service';
import { Message } from 'primeng/primeng';
import { CadastroFuncionario } from './../models/cadastro-funcionario';


@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {
    private funcionario: CadastroFuncionario;
    private msgs: Message[];
    public uploader: FileUploader;
    private url: string;
    private envieiFoto: boolean;
    private submit: boolean;

    constructor(private route: ActivatedRoute, private funcionarioService: FuncionarioService, private ftpService: FtpService) {
        this.submit = false;
        this.funcionario = new CadastroFuncionario();
        this.url = "";
        this.uploader = new FileUploader({ url: "" });
        this.msgs = [];
        this.envieiFoto = false;
    }

    ngOnInit() {
        this.loadFuncionario();
    }

    reset() {
        this.submit = false;
        this.funcionario = new CadastroFuncionario();
        this.envieiFoto = false;
    }

    loadFuncionario() {
        this.route.params.subscribe(
            (params: any) => {
                if (params['id'] != undefined) {
                    this.submit = true;
                    this.envieiFoto = true;
                    this.funcionarioService.getFuncionario(params['id']).subscribe(res => {
                        this.funcionario = res;
                        this.submit = false;
                    })
                }
            }
        );
    }

    cadastrar() {
        console.log(this.funcionario);
        if (this.funcionario.id != undefined)
            return this.funcionarioService.atualizarFuncionario(this.funcionario)
        else
            return this.funcionarioService.cadastrarFuncionario(this.funcionario)
    }

    onSubmit() {
        this.submit = true;

        this.cadastrar()
            .subscribe(res => {
                this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
                // this.reset()
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
                this.funcionario.foto = response
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
