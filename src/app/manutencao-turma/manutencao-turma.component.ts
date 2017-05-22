import { ConsultaTurma } from './../models/consulta-turmas';
import { ConsultaAlunos } from './../models/consulta-alunos';
import { ConsultaProfessor } from './../models/consulta-professor';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Message } from 'primeng/primeng';
import { AlunoService } from './../servicos/aluno.service';
import { ProfessorService } from './../servicos/professor.service';
import { Salas } from './../models/salas';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { TurmaService } from './../servicos/turma.service';
import { DescontoService } from './../servicos/desconto.service';
import { TipoDesconto } from './../models/tipo-desconto';

@Component({
  selector: 'app-manutencao-turma',
  templateUrl: './manutencao-turma.component.html',
  styleUrls: ['./manutencao-turma.component.scss']
})
export class ManutencaoTurmaComponent implements OnInit {

  private inscricao: Subscription;
  private idTurma: number;
  // private dias: DiasSemana[];
  private professores: ConsultaProfessor[];
  private professoras: ConsultaProfessor[];
  private salas: Salas[];
  private nives: NivelTurma[];
  private modalidades: ModalidadeTurma[];
  private alunos: ConsultaAlunos[]
  private turma: ConsultaTurma;
  private pesquisa: ConsultaAlunos;
  private msgs: Message[];
  private descontos: TipoDesconto[];
  private desconto: TipoDesconto[];
  private diaVencimento: number[];
  private valorMatricula: number[];
  private submit: boolean;
  private load: any;

  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService,
    private router: Router, private route: ActivatedRoute,
    private alunoService: AlunoService,
    private descontoService: DescontoService,
  ) {
    this.pesquisa = new ConsultaAlunos();
    this.turma = new ConsultaTurma();
    this.msgs = [];
    this.desconto = []
    this.descontos = [];
    this.diaVencimento = [];
    this.valorMatricula = [];
    this.submit = false;
  }

  ngOnInit() {


    this.descontoService.obterDescontos().subscribe(res => {
      this.descontos = [];
      this.descontos.push(new TipoDesconto());
      res.forEach(v => {
        this.descontos.push(v);
      })

    }, erro => {
    });


    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })

    this.turmaService.getNiveis().subscribe(res => {
      this.nives = res;
    })


    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idTurma = params['id'];
        // this.loadTurma();
      }
    );
  }

  // setDescontosAlunosMatriculados(){
  //   if(this.descontos.length === 0)
  //   {
  //     this.load = setInterval(this.setDescontosAlunosMatriculados(), 500);
  //   }
  //   else{
  //     clearInterval(this.load);

  //     this.matriculas.forEach(matricula =>{
  //       if(matricula.desconto != undefined || matricula.desconto != null)
  //       {
  //         this.descontos.forEach(desconto =>{
  //           if(desconto.id === matricula.desconto.id)
  //           {
  //             matricula.desconto = desconto;
  //           }
  //         })
  //       }
  //     })
  //   }
  // }

  // alterarDesconto(matricula: Matricula)
  // {
  //   if(matricula.desconto.id === undefined)
  //     return this.turmaService.deletarDesconto(matricula)
  //   else
  //     return this.turmaService.alterarDesconto(matricula);
  // }

  // atualizarDesconto(matricula: Matricula){
  //     this.alterarDesconto(matricula).subscribe(res => {
  //     this.reset();
  //     this.msgs.push({ severity: 'success', summary: 'Desconto Alterado !' });
  //   },
  //     error => {
  //       this.submit = false;
  //       this.msgs.push({ severity: 'error', summary: 'Desconto não Alterado !', detail: JSON.parse(error._body)["message"] });
  //     });
  // }

  // loadTurma() {
  //   this.turmaService.getTurma(this.idTurma).subscribe(res => {
  //     this.turma = res;

  //   });

  //   this.turmaService.getMatriculas(this.idTurma).subscribe(res => {
  //     this.matriculas = res;
  //     this.setDescontosAlunosMatriculados();

  //   });

  // }

  // encerrar() {
  //   this.turmaService.finalizar(this.turma).subscribe(res => {
  //     this.msgs.push({ severity: 'success', summary: 'Turma Encerrada Com Sucesso !' });
  //     this.router.navigate(['/consulta-turmas']);
  //   })
  // }

  // excluirAluno(aluno: Matricula) {
  //   this.submit = true;
  //   aluno.turma = this.turma;
  //   this.turmaService.excluirAlunoTurma(aluno).subscribe(res => {
  //     this.reset();
  //     this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
  //   },
  //     error => {
  //       this.submit = false;
  //       this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
  //     });
  // }

  // pesquisarAlunos() {
  //   this.alunoService.pesquisarAlunos(this.pesquisa.nome, this.pesquisa.email, this.pesquisa.cpf).subscribe(res => {
  //     this.alunos = res;
  //   });
  // }

  // reset() {
  //   this.alunos = new Array<ConsultaAlunos>();
  //   this.loadTurma();
  //   this.pesquisa = new ConsultaAlunos();
  //   this.submit = false;
  // }

  // matricular(alunoParametro: ConsultaAlunos, desconto: TipoDesconto, diaVencimento: number, valorMatricula: number) {
  //   this.submit = true;
  //   this.turmaService.matricularAluno(this.turma, alunoParametro, desconto, diaVencimento, valorMatricula).subscribe(res => {
  //     this.msgs.push({ severity: 'success', summary: 'Matricula Efetuada Com Sucesso !' });
  //     this.router.navigate(['/detalhe-aluno', alunoParametro.id]);
  //     this.reset();

  //   }, error => {
  //     this.submit = false;
  //     this.msgs.push({ severity: 'error', summary: 'Matricula Com Erro !', detail: JSON.parse(error._body)["message"] });
  //   }
  //   );
  // }


}

