export class ProxyFactory {

  /**
   *
   * @param {any} target
   * @param {string[]} properties
   * @param {Function} callback
   */
  static create(target, properties, callback) {
    return new Proxy(target, {
      get(target, prop, receiver) {
        if (properties.includes(prop) && ProxyFactory._isFunction(target[prop])) {
          return function () {
            let retorno = Reflect.apply(target[prop], target, arguments);
            callback(target);
            return retorno;
          };
        }
        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        let retorno = Reflect.set(target, prop, value, receiver);
        if (properties.includes(prop)) {
          callback(target);
        }
        return retorno;
      }

    });
  }

  /**
   *
   * @param {any} possibleFunction
   */
  static _isFunction(possibleFunction) {
    return typeof(possibleFunction) === typeof(Function);
  }

}