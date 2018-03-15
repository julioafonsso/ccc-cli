import { Taxa } from './taxa';
import { PagamentoMatricula } from './pagamento-matricula';
import { CadastroMatricula } from './cadastro-matricula';
import { ConsultaWorkShop } from './consulta-workshop';
import { ConsultaAulaParticular } from './consulta-aula-particular';
import { CadastroAulaParticular } from './cadastro-aula-particular';
import { ConsultaMensalidades } from './consulta-mensalidades';

export class Pagamentos {
    constructor(){
        this.aulasParticulares = new Array<CadastroAulaParticular>()  ;
        this.mensalidadesParaPagar = new Array<ConsultaMensalidades>();
        this.workShop = new Array<ConsultaWorkShop>();
        this.matriculas = new Array<PagamentoMatricula>();
        this.taxas = new Array<Taxa> ();
    }
    public mensalidadesParaPagar: ConsultaMensalidades[];
    public aulasParticulares: CadastroAulaParticular[];
    public workShop: ConsultaWorkShop[];
    public matriculas: PagamentoMatricula[];
    public taxas: Taxa[];
    
}