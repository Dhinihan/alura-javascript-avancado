class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  /**
   *
   * @param {string} url
   * @param {string} erro
   */
  _getNegociacoes(url, erro) {

    return new Promise((resolve, reject) => {
      this._http.get(url).then(negociacoes => resolve(negociacoes.map(
        dados => new Negociacao(new Date(dados.data), dados.valor, dados.quantidade)
      ))).catch(backErro => {
        console.log(backErro);
        reject(erro);
      });
    });
  }

  /**
   * @returns {Promise}
   */
  getNegociacoesDaSemana() {
    return this._getNegociacoes('negociacoes/semana', 'Não foi possível importar as negociações da semana.');
  }

  /**
   * @returns {Promise}
   */
  getNegociacoesDaSemanaAnterior() {
    return this._getNegociacoes('negociacoes/anterior', 'Não foi possível importar as negociações da semana anterior.');
  }

  /**
   * @returns {Promise}
   */
  getNegociacoesDaSemanaRetrasada() {
    return this._getNegociacoes(
      'negociacoes/retrasada',
      'Não foi possível importar as negociações da semana retrasada.');
  }
}