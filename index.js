const customExpress = require('./config/customExpress');
const connectionDB = require('./infra/DbConnection');
const TablesService = require('./infra/tables');

const serverInitMessage = () => {

    return `
    ************************************************        
    ***                                          ***
    ***                 SERVER                   ***
    ***                   IS                     ***
    ***                 RUNNING                  ***        
    ***                   ON                     ***
    ***                  3000                    ***
    ***                 ◕ ‿‿ ◕                   ***  
    ***                                          ***
    ************************************************
    `;
}

connectionDB.then((connection) => {
    TablesService.init(connection).then(() => {
        const app = customExpress();
        app.listen(3000, () => console.log(serverInitMessage()));
    });
});
