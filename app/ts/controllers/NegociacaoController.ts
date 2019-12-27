class NegociacaoController{

    //DOM
    private _inputData: HTMLInputElement;

    private _inputQuantidade : JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new Views.NegociacoesView('#negociacoesViewID');
    private _mensagemView = new Views.MensagemView('#mensagemView');
    
    constructor(){
        //Acessando diretamento o DOM
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes.getNegociacoes());
    }

    adiciona(event: Event){

        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inputData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        
        this._negociacoesView.update(this._negociacoes.getNegociacoes());
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

}
