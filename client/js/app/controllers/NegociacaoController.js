class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacao = new ListaNegociacoes();
        this._view = new NegociacaoView($('#NegociacaoView'));

        this._view.update(this._listaNegociacao.lista);
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._view.update(this._listaNegociacao.lista);

        console.log(this._listaNegociacao.lista);
    }

    _criaNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}
