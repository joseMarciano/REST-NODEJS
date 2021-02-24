module.exports = (app) => {
    app.get('/teste', (req, res) => {
        return res.send('<h1> 25 </h1>');
    });
    app.post('/teste', (req, res) => {
        return res.send('<h1> POST </h1>');
    });
}