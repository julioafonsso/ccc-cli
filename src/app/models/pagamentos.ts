import { ConsultaAulaParticular } from './consulta-aula-particular';
import { CadastroAulaParticular } from './cadastro-aula-particular';
import { ConsultaMensalidades } from './consulta-mensalidades';

export class Pagamentos {
    constructor(){
        this.aulasParticulares = new Array() // ;
        this.mensalidadesParaPagar = new Array()
    }
    public mensalidadesParaPagar: ConsultaMensalidades[];
    public aulasParticulares: CadastroAulaParticular[];
    
}