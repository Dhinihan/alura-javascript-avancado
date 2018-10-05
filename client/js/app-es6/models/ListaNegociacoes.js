class ListaNegociacoes {

  /**
   *
   * @param {function} callback
   */
  constructor() {
    this._lista = [];
  }

  /**
   *
   * @param {Negociacao} negociacao
   */
  adiciona(negociacao) {
    this._lista.push(negociacao);
  }

  /**
   *
   */
  esvazia() {
    this._lista = [];
  }

  /**
   * @returns array
   */
  get lista() {
    return [].concat(this._lista);
  }
}