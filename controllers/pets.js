const PetsDAO = require('../DAO/PetsDAO');
const Pet = require('../model/Pet');

module.exports = app => {

    app.post('/pet', (req,res) => {
        const petDao = new PetsDAO(new Pet(req.body));
        
        petDao.save()
        .then(result => res.status(201).json(result))
        .catch(error => res.status(500).json(error))
    });
}