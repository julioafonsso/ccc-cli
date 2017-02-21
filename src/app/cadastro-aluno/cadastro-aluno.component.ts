import { EstadoCivil } from './../models/estado-civil';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { AlunoService } from './../servicos/aluno.service';
import { ConheceEscola } from './../models/conhece-escola';
import { Aluno } from './../models/aluno';


@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss']
})
export class CadastroAlunoComponent implements OnInit {

  private listaEstadoCivil: EstadoCivil[];
  public uploader:FileUploader = new FileUploader({url: 'teste'});
  

  
  private listaComoConheceu: ConheceEscola[];
  private aluno = new Aluno();
  private foto: any;
  private url:string ="";
  
  constructor(private alunoService: AlunoService) { }

  ngOnInit() {
    this.alunoService.getListaEstadoCivil().subscribe(res => {
      this.listaEstadoCivil = res;
    })

    this.alunoService.getListaComoConheceu().subscribe(res => {
      this.listaComoConheceu = res;
    })

  }

  
  onSubmit() {
    this.alunoService.cadastrar(this.aluno)
    .subscribe((res: Response) =>{
      if(res.status == 200)
      {
        let alunoCadastrado: Aluno = res.json();
        this.alunoService.cadastrarFoto(alunoCadastrado.id, this.uploader);
      }
      else{
        console.log("ERRO")
      }
    })
    
    this.uploader.uploadAll();
    
  }
  
  onChange(event) {
    var files = event.srcElement.files;
  }
}
