class NegociacaoView extends View {

    /**
     *
     * @param {Array} lista
     */
    template(lista) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${
                    lista.map(n => `
                    <tr>
                        <td>${DataHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                    `).join('')
                }
            </tbody>

            <tfoot>
                <td colspan=3></td>
                <td>
                ${ lista.reduce((totalAnterior, negociacaoAtual) => totalAnterior + negociacaoAtual.volume, 0) }
                </td>
            </tfoot>
        </table>
        `;
    }
}