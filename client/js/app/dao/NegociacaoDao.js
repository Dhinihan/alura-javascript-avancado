class NegociacaoDao {

  /**
   *
   * @param {IDBDatabase} connection
   */
  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  /**
   *
   * @param {Negociacao} negociacao
   * @return {Promise<void>}
   */
  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao);

      request.onsuccess = event => resolve();
      request.onerror = event => {
        console.log(event.target.error);
        reject('Erro ao adicionar uma negociação');
      };
    });
  }

  /**
   * @returns {Promise<Array<Negociacao>>}
   */
  listaTodos() {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

      let negociacoes = [];

      request.onsuccess = event => {

        let atual = event.target.result;
        if (atual) {
          let dado = atual.value;
          negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
          atual.continue();
        } else {
          resolve(negociacoes);
        }
      };

      request.onerror = event => {
        console.log(event.target.error);
        reject('Erro ao listar as negociações');
      };
    });
  }

  /**
   * @returns
   */
  apagaTodos() {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear();

      request.onsuccess = event => resolve();
      request.onerror = event => {
        console.log(event.target.error);
        reject('Erro ao apagar as negociações');
      };
    });
  }
}