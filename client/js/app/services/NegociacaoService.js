'use strict';

System.register(['../dao/NegociacaoDao', '../models/Negociacao', './ConnectionFactory', './HttpService'], function (_export, _context) {
  "use strict";

  var NegociacaoDao, Negociacao, ConnectionFactory, HttpService, _createClass, NegociacaoService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_daoNegociacaoDao) {
      NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }, function (_ConnectionFactory) {
      ConnectionFactory = _ConnectionFactory.ConnectionFactory;
    }, function (_HttpService) {
      HttpService = _HttpService.HttpService;
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

      _export('NegociacaoService', NegociacaoService = function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        /**
         *
         * @param {Negociacao} negociacao
         * @returns {Promise<string>}
         */


        _createClass(NegociacaoService, [{
          key: 'cadastra',
          value: function cadastra(negociacao) {
            var _this = this;

            return ConnectionFactory.getConnection().then(function (conn) {
              return new NegociacaoDao(conn);
            }).then(function (dao) {
              return dao.adiciona(negociacao);
            }).then(function () {
              return 'Negociação adicionada com sucesso';
            }).catch(function (error) {
              return _this._mensagem.texto = error;
            });
          }
        }, {
          key: 'lista',
          value: function lista() {
            return ConnectionFactory.getConnection().then(function (conn) {
              return new NegociacaoDao(conn);
            }).then(function (dao) {
              return dao.listaTodos();
            });
          }
        }, {
          key: 'apaga',
          value: function apaga(lista) {
            return ConnectionFactory.getConnection().then(function (conn) {
              return new NegociacaoDao(conn);
            }).then(function (dao) {
              return dao.apagaTodos();
            }).then(function () {
              return "Negociações apagadas com sucesso";
            });
          }
        }, {
          key: '_getNegociacoes',
          value: function _getNegociacoes(url, erro) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              _this2._http.get(url).then(function (negociacoes) {
                return resolve(negociacoes.map(function (dados) {
                  return new Negociacao(new Date(dados.data), dados.valor, dados.quantidade);
                }));
              }).catch(function (backErro) {
                console.log(backErro);
                reject(erro);
              });
            });
          }
        }, {
          key: 'getNegociacoesDaSemana',
          value: function getNegociacoesDaSemana() {
            return this._getNegociacoes('negociacoes/semana', 'Não foi possível importar as negociações da semana.');
          }
        }, {
          key: 'getNegociacoesDaSemanaAnterior',
          value: function getNegociacoesDaSemanaAnterior() {
            return this._getNegociacoes('negociacoes/anterior', 'Não foi possível importar as negociações da semana anterior.');
          }
        }, {
          key: 'getNegociacoesDaSemanaRetrasada',
          value: function getNegociacoesDaSemanaRetrasada() {
            return this._getNegociacoes('negociacoes/retrasada', 'Não foi possível importar as negociações da semana retrasada.');
          }
        }, {
          key: 'importaNegociacoes',
          value: function importaNegociacoes() {
            return Promise.all([this.getNegociacoesDaSemana(), this.getNegociacoesDaSemanaAnterior(), this.getNegociacoesDaSemanaRetrasada()]).then(function (importacoes) {
              return importacoes.reduce(function (arrayAchatado, array) {
                return arrayAchatado.concat(array);
              }, []);
            });
          }
        }]);

        return NegociacaoService;
      }());

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map