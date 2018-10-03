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

    ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDao(conn))
      .then(dao => dao.listaTodos())
      .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacao.adiciona(negociacao)))
      .catch(error => this._mensagem.texto = error);
  }

  adiciona(event) {
    event.preventDefault();

    ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDao(conn))
      .then(dao => dao.adiciona(this._criaNegociacao()))
      .then(() => {
        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._mensagem.texto = 'Negociação adicionada com sucesso';
      })
      .catch(error => this._mensagem.texto = error);
  }

  apaga() {
    ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDao(conn))
      .then(dao => dao.apagaTodos())
      .then(() => {
        this._listaNegociacao.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
      })
      .catch(error => this._mensagem.texto = error);
  }

  importaNegociacoes() {
    let service = new NegociacaoService();
    Promise.all([
      service.getNegociacoesDaSemana(),
      service.getNegociacoesDaSemanaAnterior(),
      service.getNegociacoesDaSemanaRetrasada(),
    ]).then(negociacoes => {
      negociacoes
        .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        .forEach(negociacao => {
          this._listaNegociacao.adiciona(negociacao);
        });
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
