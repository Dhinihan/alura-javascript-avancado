import { View } from './View';
import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { DataHelper } from '../helpers/DataHelper';

export class NegociacaoView extends View {

    /**
     *
     * @param {ListaNegociacoes} model
     */
    template(model) {
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
                    model.lista.map(n => `
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
                ${ model.lista.reduce((totalAnterior, negociacaoAtual) => totalAnterior + negociacaoAtual.volume, 0) }
                </td>
            </tfoot>
        </table>
        `;
    }
}