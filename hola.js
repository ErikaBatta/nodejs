// customElements.log("Hola mundo")
// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.write('Hola mundo desde Node.js');
//     res.end();
// });

// server.listen(3000, () => {
//     console.log('Servidor en http://localhost:3000');
// });


const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('pagina de contacto');
});

app.get('/usuario/:id', (req, res) => {
    res.send(`Usuario ID: ${req.params.id}`);
});


app.listen(3000, () => console.log('Servidor Express'));


