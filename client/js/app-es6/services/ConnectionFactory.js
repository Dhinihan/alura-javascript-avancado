const bd = 'aluraframe';
const version = 4;
const stores = ['negociacoes'];

let connection;
let close;

export class ConnectionFactory {

  constructor() {
    throw new Error('ConnectionFactory não pode ser instanciada');
  }

  /**
   * @returns {Promise<IDBDatabase>}
   */
  static getConnection() {

    return new Promise((resolve, reject) => {
      var openRequest = window.indexedDB.open(bd, version);

      openRequest.onupgradeneeded = evento => {
        ConnectionFactory._createStores(evento.target.result);
      };
      openRequest.onsuccess = evento => {
        if (!connection) {
          connection = evento.target.result;
          close = connection.close.bind(connection);
          connection.close = function () { };
        }
        resolve(connection);
      };
      openRequest.onerror = evento => {
        console.log(evento.target.error);
        reject(evento.target.error.name);
      };
    });
  }

  static closeConnection() {
    close();
    connection = null;
  }

  static _createStores(conn) {
    stores.forEach(store => {
      if (conn.objectStoreNames.contains(store)) {
        conn.deleteObjectStore(store);
      }
      conn.createObjectStore(store, { autoIncrement: true });
    });
  }
};