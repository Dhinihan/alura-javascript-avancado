class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._service = new NegociacaoService();

    this._view = new NegociacaoView($('#NegociacaoView'));
    /** @type ListaNegociacoes */
    this._listaNegociacao = new Bind(new ListaNegociacoes(), this._view, 'adiciona', 'esvazia');

    this._mensagemView = new MensagemView($('#MensagemView'));
    /** @type Mensagem */
    this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');

    this._init();
  }

  _init() {
    this._service.lista()
      .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacao.adiciona(negociacao)))
      .catch(error => this._mensagem.texto = error);

    this.importaNegociacoes();
    setInterval(() => {
      this.importaNegociacoes();
    }, 10000);
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = this._criaNegociacao();
    this._service.cadastra(negociacao)
      .then(resultado => {
        this._mensagem.texto = resultado;
        this._listaNegociacao.adiciona(negociacao);
        this._limpaFormulario();
      })
      .catch(erro => this._mensagem.texto = erro);

  }

  apaga() {
    this._service.apaga()
      .then(resultado => {
        this._listaNegociacao.esvazia();
        this._mensagem.texto = resultado;
      })
      .catch(error => this._mensagem.texto = error);
  }

  importaNegociacoes() {
    let service = new NegociacaoService();
    service.importaNegociacoes().then(negociacoes => {
      negociacoes
        .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        .filter(negociacao =>
          !this._listaNegociacao.lista.some(negociacaoDentro =>
            JSON.stringify(negociacao) == JSON.stringify(negociacaoDentro)
          ))
        .forEach(negociacao => this._listaNegociacao.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso.';
    }).catch(erro => this._mensagem.texto = erro);
  }

  _criaNegociacao() {
    return new Negociacao(
      DataHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }
}