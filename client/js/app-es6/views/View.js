export class View {

  /**
   *
   * @param {HTMLElement} elemento
   */
  constructor(elemento) {
    this._elemento = elemento;
  }

  /**
   *
   * @param {any} model
   */
  update(model) {
    this._elemento.innerHTML = this.template(model);
  }

  template(dados) {
    throw new Error("Faltou implementar o método template");
  }
}