class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._view = new NegociacaoView($('#NegociacaoView'));
    /** @type ListaNegociacoes */
    this._listaNegociacao = new Bind(new ListaNegociacoes(), this._view, 'adiciona', 'esvazia');

    this._mensagemView = new MensagemView($('#MensagemView'));
    /** @type Mensagem */
    this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacao.adiciona(this._criaNegociacao());
    this._limpaFormulario();
    this._mensagem.texto = 'Negociação adicionada com sucesso';
  }

  apaga() {
    this._listaNegociacao.esvazia();
    this._mensagem.texto = "Negociações apagadas com sucesso";
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
