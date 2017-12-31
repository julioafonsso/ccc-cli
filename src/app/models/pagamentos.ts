import { PagamentoMatricula } from './pagamento-matricula';
import { CadastroMatricula } from './cadastro-matricula';
import { ConsultaWorkShop } from './consulta-workshop';
import { ConsultaAulaParticular } from './consulta-aula-particular';
import { CadastroAulaParticular } from './cadastro-aula-particular';
import { ConsultaMensalidades } from './consulta-mensalidades';

export class Pagamentos {
    constructor(){
        this.aulasParticulares = new Array()  ;
        this.mensalidadesParaPagar = new Array();
        this.workShop = new Array();
        this.matriculas = new Array();
    }
    public mensalidadesParaPagar: ConsultaMensalidades[];
    public aulasParticulares: CadastroAulaParticular[];
    public workShop: ConsultaWorkShop[];
    public matriculas: PagamentoMatricula[];
    
}