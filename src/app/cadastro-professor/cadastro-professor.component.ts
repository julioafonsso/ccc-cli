import { DatePipe } from '@angular/common';
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
  private submit : boolean;

  constructor(private professorService: ProfessorService, private ftpService: FtpService) {
    this.submit =false;
    this.professor = new Professor();
    this.url = "";
    this.uploader = new FileUploader({ url: "" });
    this.msgs = [];
    this.envieiFoto = false;
  }

  ngOnInit() {
  }

  reset() {
    this.submit =false;
    this.professor = new Professor();
    this.envieiFoto = false;
    this.dataAdmissao = null;
    this.dataNascimento = null;
  }

  onSubmit() {
    this.submit =true;
    let d = new DatePipe("pt");
    this.professor.dataNascimento = d.transform(this.dataNascimento, 'yyyyMMdd');
    this.professor.dataAdmissao = d.transform(this.dataAdmissao, 'yyyyMMdd');

    this.professorService.cadstrarProfessor(this.professor)
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
    if (this.envieiFoto) {
      this.ftpService.alterarFoto(this.professor.foto, this.uploader);
    }
    else {
      this.ftpService.cadastrarFoto(this.uploader);
    }
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
