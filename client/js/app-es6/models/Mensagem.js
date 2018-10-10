export class Mensagem {

  /**
   * @param {string} texto
   */
  constructor(texto = '') {
    this._texto = texto;
  }

  /**
   *
   */
  get texto () {
    return this._texto;
  }

  /**
   * @param {string} texto
   */
  set texto (texto) {
    this._texto = texto;
  }
}
