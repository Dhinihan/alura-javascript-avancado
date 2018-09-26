class MensagemView extends View {

    /**
     *
     * @param {string} texto
     */
    template(texto) {
        if (!texto) return '<p></p>';
        return `<p class="alert alert-info">${texto}</p>`;
    }
}