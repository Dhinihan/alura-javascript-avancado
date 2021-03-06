'use strict';

System.register(['../helpers/Bind', '../helpers/DataHelper', '../models/ListaNegociacoes', '../models/Mensagem', '../models/Negociacao', '../services/NegociacaoService', '../views/MensagemView', '../views/NegociacaoView'], function (_export, _context) {
  "use strict";

  var Bind, DataHelper, ListaNegociacoes, Mensagem, Negociacao, NegociacaoService, MensagemView, NegociacaoView, _createClass, NegociacaoController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_helpersBind) {
      Bind = _helpersBind.Bind;
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_modelsListaNegociacoes) {
      ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
    }, function (_modelsMensagem) {
      Mensagem = _modelsMensagem.Mensagem;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }, function (_servicesNegociacaoService) {
      NegociacaoService = _servicesNegociacaoService.NegociacaoService;
    }, function (_viewsMensagemView) {
      MensagemView = _viewsMensagemView.MensagemView;
    }, function (_viewsNegociacaoView) {
      NegociacaoView = _viewsNegociacaoView.NegociacaoView;
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

      _export('NegociacaoController', NegociacaoController = function () {
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

          var $ = document.querySelector.bind(document);

          this._inputData = $('#data');
          this._inputQuantidade = $('#quantidade');
          this._inputValor = $('#valor');
          this._service = new NegociacaoService();

          this._view = new NegociacaoView($('#NegociacaoView'));
          /** @type ListaNegociacoes */
          this._listaNegociacao = new Bind(new ListaNegociacoes(), this._view, 'adiciona', 'esvazia');

          this._mensagemView = new MensagemView($('#MensagemView'));
          /** @type Mensagem */
          this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');

          this._init();
        }

        _createClass(NegociacaoController, [{
          key: '_init',
          value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacao.adiciona(negociacao);
              });
            }).catch(function (error) {
              return _this._mensagem.texto = error;
            });

            this.importaNegociacoes();
            setInterval(function () {
              _this.importaNegociacoes();
            }, 10000);
          }
        }, {
          key: 'adiciona',
          value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();
            var negociacao = this._criaNegociacao();
            this._service.cadastra(negociacao).then(function (resultado) {
              _this2._mensagem.texto = resultado;
              _this2._listaNegociacao.adiciona(negociacao);
              _this2._limpaFormulario();
            }).catch(function (erro) {
              return _this2._mensagem.texto = erro;
            });
          }
        }, {
          key: 'apaga',
          value: function apaga() {
            var _this3 = this;

            this._service.apaga().then(function (resultado) {
              _this3._listaNegociacao.esvazia();
              _this3._mensagem.texto = resultado;
            }).catch(function (error) {
              return _this3._mensagem.texto = error;
            });
          }
        }, {
          key: 'importaNegociacoes',
          value: function importaNegociacoes() {
            var _this4 = this;

            var service = new NegociacaoService();
            service.importaNegociacoes().then(function (negociacoes) {
              negociacoes.reduce(function (arrayAchatado, array) {
                return arrayAchatado.concat(array);
              }, []).filter(function (negociacao) {
                return !_this4._listaNegociacao.lista.some(function (negociacaoDentro) {
                  return JSON.stringify(negociacao) == JSON.stringify(negociacaoDentro);
                });
              }).forEach(function (negociacao) {
                return _this4._listaNegociacao.adiciona(negociacao);
              });
              _this4._mensagem.texto = 'Negociações importadas com sucesso.';
            }).catch(function (erro) {
              return _this4._mensagem.texto = erro;
            });
          }
        }, {
          key: '_criaNegociacao',
          value: function _criaNegociacao() {
            return new Negociacao(DataHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
          }
        }, {
          key: '_limpaFormulario',
          value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
          }
        }]);

        return NegociacaoController;
      }());

      _export('NegociacaoController', NegociacaoController);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map