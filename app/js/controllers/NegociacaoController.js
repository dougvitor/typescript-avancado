class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new Views.NegociacoesView('#negociacoesViewID');
        this._mensagemView = new Views.MensagemView('#mensagemView');
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes.getNegociacoes());
    }
    adiciona(event) {
        event.preventDefault();
        const negociacao = new Negociacao(new Date(this._inputData.value.replace(/-/g, ',')), parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes.getNegociacoes());
        this._mensagemView.update('Negociação adicionada com sucesso');
    }
}
