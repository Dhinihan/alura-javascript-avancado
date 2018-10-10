'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, bd, version, stores, connection, close, ConnectionFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      bd = 'aluraframe';
      version = 4;
      stores = ['negociacoes'];
      connection = void 0;
      close = void 0;

      _export('ConnectionFactory', ConnectionFactory = function () {
        function ConnectionFactory() {
          _classCallCheck(this, ConnectionFactory);

          throw new Error('ConnectionFactory não pode ser instanciada');
        }

        /**
         * @returns {Promise<IDBDatabase>}
         */


        _createClass(ConnectionFactory, null, [{
          key: 'getConnection',
          value: function getConnection() {

            return new Promise(function (resolve, reject) {
              var openRequest = window.indexedDB.open(bd, version);

              openRequest.onupgradeneeded = function (evento) {
                ConnectionFactory._createStores(evento.target.result);
              };
              openRequest.onsuccess = function (evento) {
                if (!connection) {
                  connection = evento.target.result;
                  close = connection.close.bind(connection);
                  connection.close = function () {};
                }
                resolve(connection);
              };
              openRequest.onerror = function (evento) {
                console.log(evento.target.error);
                reject(evento.target.error.name);
              };
            });
          }
        }, {
          key: 'closeConnection',
          value: function closeConnection() {
            close();
            connection = null;
          }
        }, {
          key: '_createStores',
          value: function _createStores(conn) {
            stores.forEach(function (store) {
              if (conn.objectStoreNames.contains(store)) {
                conn.deleteObjectStore(store);
              }
              conn.createObjectStore(store, { autoIncrement: true });
            });
          }
        }]);

        return ConnectionFactory;
      }());

      _export('ConnectionFactory', ConnectionFactory);

      ;
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map