class ListaNegociacoes {
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
     * @returns array
     */
    get lista () {
        return [].concat(this._lista);
    }
}