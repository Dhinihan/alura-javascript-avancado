import {View} from './View';
import { Mensagem } from '../models/Mensagem';

export class MensagemView extends View {

    /**
     *
     * @param {Mensagem} model
     */
    template(model) {
        if (!model.texto) return '<p></p>';
        return `<p class="alert alert-info">${model.texto}</p>`;
    }
}