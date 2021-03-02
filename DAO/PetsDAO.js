const connection = require('../infra/DbConnection');
const uploadFiles = require('../files/uploadFiles');
const Pet = require('../model/Pet');

class PetsDAO {
    constructor(pet) {
        this._pet = pet;
    }


    save() {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO PETS SET ?'
            return connection.then(connectionSuccesful => {
                uploadFiles(this._pet.imagem,this._pet.nome,(newPath) => {

                    const newPet = new Pet({nome: this._pet.nome, imagem: newPath});
                    connectionSuccesful.query(query, newPet, (error, results, fields) => {
                        if (error) {
                            console.log(error.stack);
                            reject('Não foi possível salvar o PET');
                            return;
                        }
                        resolve(newPet);
                    });
                });
            });
        });

    }
}

module.exports = PetsDAO;