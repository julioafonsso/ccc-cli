import { EmailService } from './../servicos/email-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obter-emails-alunos',
  templateUrl: './obter-emails-alunos.component.html',
  styleUrls: ['./obter-emails-alunos.component.css']
})
export class ObterEmailsAlunosComponent implements OnInit {

  private email:string;
  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.emailService.obterEmailsAlunos().subscribe(res => {
      console.log(res);
      this.email = res;
    });
  }

}
