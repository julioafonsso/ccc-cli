import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { CadastroWorkShop } from './../models/cadastro-workshop';
import { Message } from 'primeng/primeng';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { ConsultaProfessor } from './../models/consulta-professor';
import { ProfessorService } from './../servicos/professor.service';
import { WorkshopService } from './../servicos/workshop.service';

@Component({
  selector: 'app-cadastro-workshop',
  templateUrl: './cadastro-workshop.component.html',
  styleUrls: ['./cadastro-workshop.component.css']
})
export class CadastroWorkshopComponent implements OnInit {

  private professores: ConsultaProfessor[];
  private professoras: ConsultaProfessor[];
  private modalidades: ModalidadeTurma[];
  private msgs: Message[];
  private turma: CadastroWorkShop;
  private submit: boolean;
  private load: any;


  constructor(private route: ActivatedRoute, private workService: WorkshopService,
    private professorService: ProfessorService) {
      this.turma = new CadastroWorkShop();
      this.msgs = []
     }

  ngOnInit() {
    this.loadCamposBasicos();
    this.loadWork();
  }

  loadWork() {

  }

  loadCamposBasicos() {

    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
      this.professoras = res;
    })

   

    this.workService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })

   
  }

  reset() {
    this.turma = new CadastroWorkShop();
    this.loadCamposBasicos();
    this.submit = false;
  }

  cadastrar() {
    if (this.turma.id == undefined)
      return this.workService.cadastrarWorkShop(this.turma);
    else
      return this.workService.alterarWorkShop(this.turma);
  }

  onSubmit() {
    this.submit = true;
    this.cadastrar().subscribe((res: Response) => {
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
      this.reset()
    },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
        this.submit = false;
      })

  }

}
