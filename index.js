const express = require('express');


const app = express();

app.listen(3000,() => console.log('Server is running at 3000'));


app.get('/teste',(req,res) => {
    return res.send('<h1> teste </h1>');
})