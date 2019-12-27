import { Negociacoes, Negociacao, DiaDaSemana } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';

export class NegociacaoController{

    //DOM
    private _inputData: HTMLInputElement;

    private _inputQuantidade : JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesViewID', true);
    private _mensagemView = new MensagemView('#mensagemView');
    
    constructor(){
        //Acessando diretamento o DOM
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes.getNegociacoes());
    }

    adiciona(event: Event){

        event.preventDefault();

        let data = new Date(this._inputData.value.replace(/-/g, ','));

        if(!this._ehDiaUtil(data)){
            return this._mensagemView.update('Informe apenas negociações ocorridas em dias úteis.');
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        
        this._negociacoesView.update(this._negociacoes.getNegociacoes());
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    private _ehDiaUtil(data: Date){
        return data.getDay() != DiaDaSemana.DOMINGO && data.getDay() != DiaDaSemana.SABADO;
    }

}

