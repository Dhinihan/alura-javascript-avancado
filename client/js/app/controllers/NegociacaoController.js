class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._view = new NegociacaoView($('#NegociacaoView'));

    let self = this;

    this._listaNegociacao = new Proxy(new ListaNegociacoes(), {
      get(target, prop, receiver) {
        if (['adiciona', 'esvasia'].includes(prop) && typeof(target[prop]) === typeof(Function)) {
          return function() {
            Reflect.apply(target[prop], target, arguments);
            self._view.update(target);
          };
        }

        return Reflect.get(target, prop, receiver);
      }
    });

    this._mensagemView = new MensagemView($('#MensagemView'));
    this._mensagem = new Mensagem((model) => this._mensagemView.update(model));

    this._view.update(this._listaNegociacao);
    this._mensagemView.update(this._mensagem);
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
