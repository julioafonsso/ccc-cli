import { DatePipe } from '@angular/common';
import { Response, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { FtpService } from './../servicos/ftp.service';
import { FileUploader } from 'ng2-file-upload';
import { AlunoService } from './../servicos/aluno.service';
import { ConheceEscola } from './../models/conhece-escola';
import { Aluno } from './../models/aluno';
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
  private aluno: Aluno;
  private foto: any;
  private url: string;
  private envieiFoto: boolean;

  constructor(private alunoService: AlunoService, private ftpService: FtpService) {
    this.aluno = new Aluno();
    this.url = "";
    this.uploader = new FileUploader({ url: "" });
    this.msgs = [];
    this.envieiFoto = false;
    this.submit = false;
  }

  ngOnInit() {
    this.alunoService.getListaEstadoCivil().subscribe(res => {
      this.listaEstadoCivil = res;
    })

    this.alunoService.getListaComoConheceu().subscribe(res => {
      this.listaComoConheceu = res;
    })
  }

  reset(){
        this.aluno = new Aluno();
        this.envieiFoto = false;
        this.dataNascimento = null;
        this.submit =false;
  }

  onSubmit() {

    this.submit =true;
    let d = new DatePipe("pt");
    this.aluno.dataNascimento = d.transform(this.dataNascimento, 'yyyyMMdd');
    
    this.alunoService.cadastrar(this.aluno)
      .subscribe(response => {
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
        this.reset()
      },
      error => {
        this.submit = false;
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      })
  }

  onChange(event) {
    if (this.envieiFoto) {
      this.ftpService.alterarFoto(this.aluno.foto, this.uploader);
    }
    else {
      this.ftpService.cadastrarFoto(this.uploader);

    }
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

