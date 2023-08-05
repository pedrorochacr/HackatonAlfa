
const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT;

console.log('Connected to PlanetScale!')

const candidatoRoutes = require('./routes/candidatoRoutes');
const reportRoutes = require('./routes/reportsRoutes');


app.use('/candidato', candidatoRoutes);
app.use('/report', reportRoutes);


app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});