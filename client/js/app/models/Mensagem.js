class Mensagem {

  /**
   *
   * @param {function} callback
   * @param {string} texto
   */
  constructor(callback, texto = '') {
    this._texto = texto;
    this._callback = callback;
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
    this._callback(this);
  }
}
