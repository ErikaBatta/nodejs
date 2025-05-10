const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ekabatta:VzTCVEdSrmJNgRZd@cluster0.pzdhtpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión:', err));

// Modelo básico para sample_mflix.movies
const Movie = mongoose.model('Movie', new mongoose.Schema({}, { collection: 'movies' }));

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API de ejemplo conectada a MongoDB Atlas');
});

// Obtener 10 películas
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find().limit(10);
        res.json(movies);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Buscar por título
app.get('/movies/search', async (req, res) => {
    const { title } = req.query;
    try {
        const movies = await Movie.find({ title: new RegExp(title, 'i') }).limit(10);
        res.json(movies);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:${port}');
});