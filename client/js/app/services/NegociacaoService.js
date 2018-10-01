class NegociacaoService {

  /**
   *
   * @param {Function} callback
   */
  getNegociacoesDaSemana(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/semana');

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          callback(null, JSON.parse(xhr.response).map(
            dados => new Negociacao(new Date(dados.data), dados.valor, dados.quantidade)
          ));
        } else {
          console.log(xhr.response);
          callback('Não foi possível importar as negociações da semana.');
        }
      }
    };

    xhr.send();
  }

}