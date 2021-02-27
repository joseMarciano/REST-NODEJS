const connection = require('../infra/DbConnection');
const moment = require('moment');
moment.locale('pt-br');

const momentFormat = 'YYYY-MM-DD HH:MM:SS';

class AtendimentoDAO {

    constructor(atendimento) {
        this._atendimento = {
            cliente: atendimento.cliente,
            pet: atendimento.pet,
            servico: atendimento.servico,
            status: atendimento.status,
            observacoes: atendimento.observacoes,
            DATA_ATENDIMENTO: moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format(momentFormat),
            DATA_CRIACAO: moment().format(momentFormat)
        }
    }
    save() {
        const query = `
        INSERT INTO ATENDIMENTOS SET ?
        `
        return new Promise((resolve, reject) => {

            const errors = this._hasValidationErrors(this._atendimento);
            if (errors.length) {
                reject(errors);
            }

            connection.then((connectionSuccesful) => {
                connectionSuccesful.query(query, this._atendimento, (error, results, fields) => {
                    if (error) {
                        console.log(error.stack);
                        reject(error);
                        return;
                    }

                    resolve(results, fields);
                });
            });
        });
    }

    static findAll(filter) {
        const query = 'SELECT * FROM ATENDIMENTOS';
        return new Promise((resolve, reject) => {
            connection.then((connectionSuccesful) => {
                connectionSuccesful.query(query, (error, results, fields) => {
                    if (error) {
                        console.log(error.stack);
                        reject(error);
                        return;
                    }

                    resolve(results, fields);
                });
            })
        });
    }
    static find(id) {
        const query = 'SELECT * FROM ATENDIMENTOS WHERE id = ' + parseInt(id);
        return new Promise((resolve, reject) => {
            connection.then((connectionSuccesful) => {
                connectionSuccesful.query(query, (error, results, fields) => {
                    if (error) {
                        console.log(error.stack);
                        reject(error);
                        return;
                    }

                    resolve(results.find(result => !!result), fields);
                });
            })
        });
    }
    static edit(id, valuesToChange) {
        const query = 'UPDATE ATENDIMENTOS SET ? WHERE ID=?';

        if (valuesToChange.dataAtendimento) {
            valuesToChange = {
                ...valuesToChange,
                DATA_ATENDIMENTO: moment(valuesToChange.dataAtendimento, 'DD/MM/YYYY').format(momentFormat)
            };
            delete valuesToChange.dataAtendimento;
        }

        return new Promise((resolve, reject) => {
            connection.then((connectionSuccesful) => {
                connectionSuccesful.query(query, [valuesToChange, id], (error, results, fields) => {
                    if (error) {
                        console.log(error.stack);
                        reject(error);
                        return;
                    }

                    resolve(results, fields);
                });
            })
        });
    }

    static delete(id) {
        const query = 'DELETE FROM ATENDIMENTOS WHERE id = ' + parseInt(id);
        return new Promise((resolve, reject) => {
            connection.then((connectionSuccesful) => {
                connectionSuccesful.query(query, (error, results, fields) => {
                    if (error) {
                        console.log(error.stack);
                        reject(error);
                        return;
                    }

                    resolve(results,fields);
                });
            })
        });
    }

    _hasValidationErrors(atendimento) {
        const validations = [
            {
                name: 'date',
                isValid: moment(atendimento.DATA_ATENDIMENTO).isSameOrAfter(atendimento.DATA_CRIACAO),
                message: 'Date of creation must be major or equal service date'
            },
            {
                name: 'client',
                isValid: atendimento.cliente.length >= 5,
                message: 'Client must be at least five characters'
            }
        ]
        return validations.filter(validation => !validation.isValid)
    }
}

module.exports = AtendimentoDAO;