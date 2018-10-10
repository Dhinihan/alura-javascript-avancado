'use strict';

System.register(['./Negociacao'], function (_export, _context) {
  "use strict";

  var Negociacao, _createClass, ListaNegociacoes;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_Negociacao) {
      Negociacao = _Negociacao.Negociacao;
    }],
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

      _export('ListaNegociacoes', ListaNegociacoes = function () {

        /**
         *
         * @param {function} callback
         */
        function ListaNegociacoes() {
          _classCallCheck(this, ListaNegociacoes);

          this._lista = [];
        }

        /**
         *
         * @param {Negociacao} negociacao
         */


        _createClass(ListaNegociacoes, [{
          key: 'adiciona',
          value: function adiciona(negociacao) {
            this._lista.push(negociacao);
          }
        }, {
          key: 'esvazia',
          value: function esvazia() {
            this._lista = [];
          }
        }, {
          key: 'lista',
          get: function get() {
            return [].concat(this._lista);
          }
        }]);

        return ListaNegociacoes;
      }());

      _export('ListaNegociacoes', ListaNegociacoes);
    }
  };
});
//# sourceMappingURL=ListaNegociacoes.js.map