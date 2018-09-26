class View {

    /**
     *
     * @param {HTMLElement} elemento
     */
    constructor(elemento) {
        this._elemento = elemento;
    }

    /**
     *
     * @param {Array} lista
     */
    update(lista) {
        this._elemento.innerHTML = this.template(lista);
    }

    template(dados) {
        throw new Error("Faltou implementar o método template");
    }
}