import { Negociacoes, Negociacao, DiaDaSemana } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import{ domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController{

    //DOM
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade : JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesViewID', true);
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();
    
    constructor(){
        this._negociacoesView.update(this._negociacoes.getNegociacoes());
    }

    @throttle()
    adiciona(event: Event){

        let data = new Date(this._inputData.val().replace(/-/g, ',')); 

        if(!this._ehDiaUtil(data)){
            return this._mensagemView.update('Informe apenas negociações ocorridas em dias úteis.');
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes.getNegociacoes());
        this._mensagemView.update('Negociação adicionada com sucesso');

    }

    private _ehDiaUtil(data: Date){
        return data.getDay() != DiaDaSemana.DOMINGO && data.getDay() != DiaDaSemana.SABADO;
    }

    @throttle()
    importaDados(){

        /*const isOk: HandlerFunction = (resp: Response) =>{
            if(resp.ok){
                return resp;
            }else{
                throw new Error(resp.statusText);
            }
        }*/

        this._service
            .obterNegociacoes(resp =>{
                if(resp.ok){
                    return resp;
                }else{
                    throw new Error(resp.statusText);
                }
            })
            .then(negociacoesParaImportar => {

                    const negociacoesJaImportadas = this._negociacoes.getNegociacoes();

                    negociacoesParaImportar
                        .filter(negociacao => !negociacoesJaImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                        .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                    
                    this._negociacoesView.update(this._negociacoes.getNegociacoes());
                }
            )
    }
    
}

