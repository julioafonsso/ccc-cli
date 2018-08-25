import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Rx';
import { EmailService } from './../servicos/email-service';
import { Email } from './../models/email';
import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import { FtpService } from '../servicos/ftp.service';

@Component({
  selector: 'app-envio-email',
  templateUrl: './envio-email.component.html',
  styleUrls: ['./envio-email.component.css']
})
export class EnvioEmailComponent implements OnInit {

  private uploader: FileUploader;
  
  public submit: boolean;
  public texto: string;
  public email: Email = new Email();
  private msgs: Message[];

  constructor(private ftpService: FtpService, private emailService : EmailService) { 
    this.uploader = new FileUploader({ url: "" });
  }

  ngOnInit() {
    this.email.fotoEnviada = false;
    this.submit = false;
    this.msgs = [];
  }

  onSubmit(){
    
    this.submit = true;
    console.log(this.email)
    this.emailService.enviarEmail(this.email).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'E-mail enviado com sucesso !' });
      this.email = new Email();
      this.submit = false;
    },
  error =>{
    this.msgs.push({ severity: 'error', summary: 'Falha no envio !' });
    this.submit = false;
  })
  }

  onChange(event) {
    
    this.submit =true;
    this.email.fotoEnviada = false;
    this.ftpService.cadastrarFotoEmail(this.uploader);

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("status retorno ", status);
        if (status === 200) {
            this.email.fotoEnviada = true;
            this.email.urlFoto = response;
            console.log(response);
        }
        this.submit = false;
    }
}

}
