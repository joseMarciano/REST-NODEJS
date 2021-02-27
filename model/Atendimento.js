const moment = require('moment');

class Atendimento {
    constructor({ cliente, pet, servico, status, observacoes, dataAtendimento }) {
        this.cliente = cliente;
        this.pet = pet;
        this.servico = servico;
        this.status = status;
        this.observacoes = observacoes;
        this.dataAtendimento = dataAtendimento;
        this.dataCriacao;
    }

}

module.exports = Atendimento;