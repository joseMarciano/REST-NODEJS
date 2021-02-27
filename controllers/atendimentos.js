const Atendimento = require('../model/Atendimento');
const AtendimentoDAO = require('../DAO/AtendimentoDAO');

module.exports = (app) => {
    app.get('/atendimento', (req, res) => {
        AtendimentoDAO.findAll()
            .then((results) => res.status(200).json({ content: results }))
            .catch((error) => res.status(500).json(error));
    });
    app.get('/atendimento/:id', (req, res) => {
        AtendimentoDAO.find(req.params.id)
            .then((results) => res.status(200).json({ content: results }))
            .catch((error) => res.status(500).json(error));
    });
    app.post('/atendimento', (req, res) => {
        const atendimentoDao = new AtendimentoDAO(new Atendimento(req.body));
        atendimentoDao.save()
            .then((results) => res.status(201).json(results))
            .catch((error) => res.status(400).json(error))
    });
    app.patch('/atendimento/:id', (req, res) => {
        AtendimentoDAO.edit(req.params.id,req.body)
        .then((results) => res.status(200).json(results))
        .catch((error) => res.status(500).json(error));
    });
    app.delete('/atendimento/:id', (req, res) => {
        AtendimentoDAO.delete(req.params.id)
        .then((results) => res.status(200).json(results))
        .catch((error) => res.status(500).json(error));
    });
}