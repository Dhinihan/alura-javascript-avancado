import { ProxyFactory } from '../services/ProxyFactory';

export class Bind {
  /**
   *
   * @param {any} model
   * @param {View} view
   * @param {string[]} properties
   */
  constructor(model, view, ...properties) {
    let proxy = ProxyFactory.create(model, properties, model => view.update(model));
    view.update(model);
    return proxy;
  }
}