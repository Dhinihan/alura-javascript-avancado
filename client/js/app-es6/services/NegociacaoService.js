import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';
import { ConnectionFactory } from './ConnectionFactory';
import { HttpService } from './HttpService';

export class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  /**
   *
   * @param {Negociacao} negociacao
   * @returns {Promise<string>}
   */
  cadastra(negociacao) {
    return ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDao(conn))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociação adicionada com sucesso')
      .catch(error => this._mensagem.texto = error);
  }

  /**
   * @returns {Promise<Negociacao[]>}
   */
  lista() {
    return ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDao(conn))
      .then(dao => dao.listaTodos());
  }

  /**
   *
   * @param {Negociacao[]} lista
   * @returns {Promise<string>}
   */
  apaga(lista) {
    return ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDao(conn))
      .then(dao => dao.apagaTodos())
      .then(() => "Negociações apagadas com sucesso");
  }

  /**
   *
   * @param {string} url
   * @param {string} erro
   */
  _getNegociacoes(url, erro) {

    return new Promise((resolve, reject) => {
      this._http.get(url).then(negociacoes => resolve(negociacoes.map(
        dados => new Negociacao(new Date(dados.data), dados.valor, dados.quantidade)
      ))).catch(backErro => {
        console.log(backErro);
        reject(erro);
      });
    });
  }

  /**
   * @returns {Promise}
   */
  getNegociacoesDaSemana() {
    return this._getNegociacoes('negociacoes/semana', 'Não foi possível importar as negociações da semana.');
  }

  /**
   * @returns {Promise}
   */
  getNegociacoesDaSemanaAnterior() {
    return this._getNegociacoes('negociacoes/anterior', 'Não foi possível importar as negociações da semana anterior.');
  }

  /**
   * @returns {Promise}
   */
  getNegociacoesDaSemanaRetrasada() {
    return this._getNegociacoes(
      'negociacoes/retrasada',
      'Não foi possível importar as negociações da semana retrasada.');
  }

  importaNegociacoes() {
    return Promise.all([
      this.getNegociacoesDaSemana(),
      this.getNegociacoesDaSemanaAnterior(),
      this.getNegociacoesDaSemanaRetrasada(),
    ]).then(importacoes => importacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []));
  }
}