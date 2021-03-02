class Tabelas {
    static init(connection) {
        this._connection = connection;
        console.log('init')
        return Promise.all([
            Tabelas._criarAtendimentos(),
            Tabelas._criarPets()
        ]);
    }

    static _criarAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS ATENDIMENTOS(
                ID INT NOT NULL AUTO_INCREMENT,
                CLIENTE VARCHAR(50) NOT NULL,
                PET VARCHAR(20),
                SERVICO VARCHAR(20) NOT NULL,
                STATUS VARCHAR(20) NOT NULL,
                OBSERVACOES TEXT,
                DATA_ATENDIMENTO DATETIME,
                DATA_CRIACAO DATETIME,
                PRIMARY KEY(ID)
            )
        
        `;

        return new Promise((resolve, reject) => {
            this._connection.query(sql,(error,results,fields) =>{
                if(error){
                    console.log(error.stack)
                    reject(error);
                    return;
                }
                resolve(results,fields)
            });
        }) 
    }

    static _criarPets() {
        const sql = `
        CREATE TABLE IF NOT EXISTS PETS (
            ID BIGINT NOT NULL AUTO_INCREMENT,
            NOME VARCHAR(50),
            IMAGEM VARCHAR(200),
            PRIMARY KEY (ID)
        );
        `;

        return new Promise((resolve, reject) => {
            this._connection.query(sql,(error,results,fields) =>{
                if(error){
                    console.log(error.stack)
                    reject(error);
                    return;
                }
                resolve(results,fields)
            });
        }) 
    }
}


module.exports = Tabelas;